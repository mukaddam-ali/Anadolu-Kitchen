export const dynamic = 'force-static'

import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

// Menu item image prompts
const MENU_IMAGE_PROMPTS = {
  'Kıymalı Pide': 'Traditional Turkish pide with ground meat, onions, and spices, wood-fired oven, professional food photography',
  'Peynirli Pide': 'Turkish flatbread with melted cheese and parsley, golden crust, food photography',
  'Sucuklu Pide': 'Turkish sausage pide with cheese and peppers, spicy, appetizing food photo',
  'Yumurtalı Pide': 'Turkish pide with egg, cheese, and sucuk, breakfast style, food photography',
  'Büyük Kıymalı Pide (1.5)': 'Large Turkish pide with ground meat, generous portion, wood-fired, professional food photo',
  'Büyük Peynirli Pide (1.5)': 'Large Turkish cheese pide with extra cheese, melted, appetizing',
  'Büyük Sucuklu Pide (1.5)': 'Large Turkish sausage pide, hearty portion, food photography',
  'Klasik Lahmacun': 'Traditional Turkish lahmacun with minced meat, vegetables, and spices, thin crispy dough',
  'Acılı Lahmacun': 'Spicy Turkish lahmacun with hot peppers, red pepper flakes, appetizing',
  'Sebzeli Lahmacun': 'Vegetarian Turkish lahmacun with fresh vegetables and herbs, colorful',
  'Turkish Pizza': 'Turkish style pizza with sucuk and bell peppers, special spices, food photography',
  'Margarita': 'Classic margarita pizza with mozzarella, tomato, and basil, Italian style',
  'Meat Lovers': 'Meat lovers pizza with pepperoni, sucuk, ground beef, and bacon',
  'Vegetarian': 'Vegetarian pizza with bell peppers, mushrooms, olives, and tomatoes',
  'Mercimek Çorbası': 'Traditional Turkish red lentil soup with mint and lemon, bowl, garnished',
  'Ezogelin Çorbası': 'Legendary Turkish soup with red lentils and bulgur, traditional bowl',
  'Domates Çorbası': 'Creamy tomato soup with croutons, appetizing, food photography',
  'Tavuk Çorbası': 'Hearty chicken noodle soup with vegetables, comfort food',
  'Baklava': 'Traditional Turkish baklava with nuts and honey syrup, layers, dessert photography',
  'Künefe': 'Hot Turkish cheese pastry with syrup and pistachios, warm, dessert',
  'Sütlaç': 'Traditional Turkish rice pudding with cinnamon, creamy, dessert photography',
  'Kadayıf': 'Turkish shredded wheat dessert with nuts and syrup, sweet, pastry',
  'Ayran': 'Traditional Turkish yogurt drink, refreshing, glass with mint',
  'Türk Kahvesi': 'Strong Turkish coffee in traditional cup, foam, coffee photography',
  'Çay': 'Traditional Turkish tea in tulip-shaped glass, steam, hot beverage',
  'Soda': 'Soft drinks collection, Coca-Cola, Fanta, Sprite, refreshing',
  'Su': 'Mineral water bottle, refreshing, clean, beverage photography',
  'Taze Sıkılmış Meyve Suyu': 'Fresh squeezed orange juice, orange slice, glass, healthy'
}

const imageCache = new Map()

async function generateFoodImage(itemName: string): Promise<string> {
  // Check cache first
  if (imageCache.has(itemName)) {
    return imageCache.get(itemName)
  }

  const prompt = MENU_IMAGE_PROMPTS[itemName] || `Traditional Turkish food: ${itemName}, professional food photography`
  
  try {
    console.log(`Starting image generation for: ${itemName}`)
    const zai = await ZAI.create()
    
    const response = await zai.images.generations.create({
      prompt: prompt,
      size: '1024x1024'
    })

    const imageBase64 = response.data[0].base64
    console.log(`Image generated successfully for: ${itemName}, base64 length: ${imageBase64.length}`)
    
    // Generate a simple hash for filename
    const filename = `${itemName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.png`
    
    // Path to save the image in public directory
    const publicDir = path.join(process.cwd(), 'public', 'generated-food-images')
    const filePath = path.join(publicDir, filename)
    
    console.log(`Attempting to save image to: ${filePath}`)
    
    // Ensure directory exists
    if (!fs.existsSync(publicDir)) {
      console.log(`Creating directory: ${publicDir}`)
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    // Convert base64 to buffer and save
    const buffer = Buffer.from(imageBase64, 'base64')
    fs.writeFileSync(filePath, buffer)
    
    console.log(`Image saved successfully: ${filename}`)
    
    // Return the public URL path
    const publicPath = `/generated-food-images/${filename}`
    
    // Cache the path
    imageCache.set(itemName, publicPath)
    
    return publicPath
    
  } catch (error) {
    console.error(`Failed to generate image for ${itemName}:`, error)
    // Return a placeholder if generation fails
    return `https://picsum.photos/seed/${itemName.replace(/\s/g, '')}/200/200.jpg`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { itemName } = await request.json()
    
    if (!itemName) {
      return NextResponse.json(
        { error: 'Item name is required' },
        { status: 400 }
      )
    }

    const imageUrl = await generateFoodImage(itemName)
    
    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      itemName: itemName
    })
    
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Food image generation API',
    availableItems: Object.keys(MENU_IMAGE_PROMPTS),
    endpoints: {
      POST: '/api/food-images - Generate image for a specific menu item'
    }
  })
}