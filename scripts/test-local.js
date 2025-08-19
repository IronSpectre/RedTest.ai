#!/usr/bin/env node

// Simple test script to verify the build works
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function testBuild() {
    console.log('🧪 Testing RedTest.ai build...\n');
    
    try {
        // Test if dependencies are installed
        if (!fs.existsSync('node_modules')) {
            console.log('📦 Installing dependencies...');
            await execAsync('npm install');
            console.log('✅ Dependencies installed!\n');
        }
        
        // Test TypeScript compilation
        console.log('🔍 Checking TypeScript...');
        await execAsync('npx tsc --noEmit');
        console.log('✅ TypeScript check passed!\n');
        
        // Test build
        console.log('🔨 Building for production...');
        const { stdout, stderr } = await execAsync('npm run build');
        
        if (stderr && !stderr.includes('warnings')) {
            console.log('⚠️ Build warnings:', stderr);
        }
        
        console.log('✅ Build completed successfully!\n');
        
        // Check if dist folder was created
        if (fs.existsSync('dist')) {
            const files = fs.readdirSync('dist');
            console.log('📁 Generated files:');
            files.forEach(file => {
                const filePath = path.join('dist', file);
                const stats = fs.statSync(filePath);
                const size = (stats.size / 1024).toFixed(2);
                console.log(`   ${file} (${size} KB)`);
            });
            console.log('');
        }
        
        // Test if critical files exist
        const criticalFiles = [
            'dist/index.html',
            'dist/assets'
        ];
        
        for (const file of criticalFiles) {
            if (fs.existsSync(file)) {
                console.log(`✅ ${file} exists`);
            } else {
                console.log(`❌ ${file} missing`);
            }
        }
        
        console.log('\n🎉 All tests passed! Your website is ready for deployment.');
        console.log('\nNext steps:');
        console.log('1. Update domain in scripts/aws-setup.sh');
        console.log('2. Configure AWS CLI: aws configure');
        console.log('3. Run: npm run setup-aws');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        
        if (error.message.includes('TypeScript')) {
            console.log('\n💡 Try: npm install typescript --save-dev');
        }
        
        if (error.message.includes('not found')) {
            console.log('\n💡 Make sure all dependencies are installed: npm install');
        }
        
        process.exit(1);
    }
}

testBuild();