Write-Host "[*] Iniciando Generacion de APK..." -ForegroundColor Cyan

# 1. Sync Changes
Write-Host "[*] Sincronizando codigo con Android..." -ForegroundColor Yellow
cmd /c npx cap sync android
if ($LASTEXITCODE -ne 0) { Write-Error "Fallo en cap sync"; exit 1 }

# 2. Build APK
Write-Host "[*] Compilando APK (Debug)..." -ForegroundColor Yellow
Set-Location android
./gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) { Write-Error "Fallo en gradlew assembleDebug"; exit 1 }
Set-Location ..

# 3. Move to Desktop & Web Folder
$source = "android/app/build/outputs/apk/debug/app-debug.apk"
$desktopDest = "$env:USERPROFILE/Desktop/FitnessConDios-Debug.apk"
$webDest = "prueba app/apk/FitnessConDios.apk"

if (Test-Path $source) {
    # Desktop
    Copy-Item $source $desktopDest -Force
    # Web folder for local testing
    if (!(Test-Path "prueba app/apk")) { New-Item -ItemType Directory -Path "prueba app/apk" }
    Copy-Item $source $webDest -Force
    
    Write-Host "[OK] APK generada con exito!" -ForegroundColor Green
    Write-Host "[OK] Escritorio: $desktopDest" -ForegroundColor Green
    Write-Host "[OK] Web Folder: $webDest" -ForegroundColor Green
}
else {
    Write-Error "[ERROR] No se encontro el archivo APK generado en: $source"
    exit 1
}

Read-Host "Presiona Enter para cerrar..."
