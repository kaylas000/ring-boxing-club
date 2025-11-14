# create-project.ps1
$projectRoot = "ring-boxing-club"

# Создание структуры папок
$folders = @(
    "css", "js", "assets/images", "assets/icons", 
    "posts", "products"
)

New-Item -ItemType Directory -Path $projectRoot -Force
foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path "$projectRoot/$folder" -Force
}

# Создание основных HTML файлов
$htmlFiles = @(
    "index.html", "shop.html", "training.html", "blog.html",
    "contacts.html", "cart.html", "product-boxing-gloves.html"
)

foreach ($file in $htmlFiles) {
    New-Item -ItemType File -Path "$projectRoot/$file" -Force
}

# Создание CSS и JS файлов
$cssFiles = @("style.css", "responsive.css")
$jsFiles = @("main.js", "animations.js", "cart.js")

foreach ($file in $cssFiles) {
    New-Item -ItemType File -Path "$projectRoot/css/$file" -Force
}

foreach ($file in $jsFiles) {
    New-Item -ItemType File -Path "$projectRoot/js/$file" -Force
}

# Конфигурационные файлы
$configFiles = @("manifest.json", "sw.js", "robots.txt", "sitemap.xml")

foreach ($file in $configFiles) {
    New-Item -ItemType File -Path "$projectRoot/$file" -Force
}

Write-Host "✅ Структура проекта Ring Boxing Club создана!" -ForegroundColor Green
