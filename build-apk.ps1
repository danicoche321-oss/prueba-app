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

# 3. Move to Desktop
$source = "android/app/build/outputs/apk/debug/app-debug.apk"
$dest = "$env:USERPROFILE/Desktop/FitnessConDios-Debug.apk"

if (Test-Path $source) {
    Copy-Item $source $dest -Force
    Write-Host "[OK] APK generada con exito!" -ForegroundColor Green
    Write-Host "[OK] Archivo: $dest" -ForegroundColor Green
} else {
    Write-Error "[ERROR] No se encontro el archivo APK generado en: $source"
    exit 1
}

Read-Host "Presiona Enter para cerrar..."
