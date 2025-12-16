# RECURIGHT Backend - Quick Start Script
# This script helps you set up and start the backend for testing

Write-Host "🚀 RECURIGHT Backend Quick Start" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "📝 Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env created! Please update it with your actual values." -ForegroundColor Green
    Write-Host ""
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm.cmd install
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Generate Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Yellow
npx.cmd prisma generate
Write-Host "✅ Prisma Client generated!" -ForegroundColor Green
Write-Host ""

# Check if database is accessible
Write-Host "🗄️  Checking database connection..." -ForegroundColor Yellow
& npx.cmd prisma db execute --raw "SELECT 1;" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database connection successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Database connection failed!" -ForegroundColor Red
    Write-Host "💡 Make sure PostgreSQL is running:" -ForegroundColor Yellow
    Write-Host "   - Using Docker: docker-compose up -d postgres" -ForegroundColor Yellow
    Write-Host "   - Or start your local PostgreSQL service" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}
Write-Host ""

# Run migrations
Write-Host "🔄 Running database migrations..." -ForegroundColor Yellow
npx.cmd prisma migrate dev
Write-Host "✅ Migrations completed!" -ForegroundColor Green
Write-Host ""

# Start the server
Write-Host "🎉 Setup complete! Starting development server..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 Server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📖 API Testing: Open test.http in VS Code with REST Client extension" -ForegroundColor Cyan
Write-Host "🔍 Database UI: Run 'npx.cmd prisma studio' in another terminal" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm.cmd run dev
