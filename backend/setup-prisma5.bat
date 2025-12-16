@echo off
echo ========================================
echo Installing Prisma 5 and Dependencies
echo ========================================
echo.

echo Removing old node_modules...
rmdir /s /q node_modules 2>nul
rmdir /s /q node_modules\.prisma 2>nul

echo.
echo Installing dependencies...
call npm install

echo.
echo Generating Prisma Client...
call npx prisma generate

echo.
echo Pushing schema to database...
call npx prisma db push

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo You can now start the server with: npm run dev
echo.
pause
