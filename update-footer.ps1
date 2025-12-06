# PowerShell script to update footer in all HTML files

$files = @(
    "services.html",
    "products.html", 
    "mission.html",
    "vision.html",
    "case-studies.html",
    "expofloor-case-studies.html",
    "max-mailer-case-studies.html",
    "mobile-usage-tracker-case-studies.html",
    "smart-process-tracker-case-studies.html",
    "visitor-cam-case-studies.html"
)

$footerScript = @'

    <script>
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            });
    </script>
'@

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        $content = Get-Content $file -Raw
        
        # Replace footer section with placeholder
        $content = $content -replace '(?s)    <!-- Footer -->.*?</footer>', '    <!-- Footer -->`n    <div id="footer-placeholder"></div>'
        
        # Add footer loading script before closing body tag if not already present
        if ($content -notmatch 'footer-placeholder') {
            $content = $content -replace '</body>', "$footerScript`n</body>"
        } elseif ($content -notmatch "fetch\('footer\.html'\)") {
            $content = $content -replace '    <!-- Scripts -->\s*<script>', "    <!-- Scripts -->$footerScript`n    <script>"
        }
        
        Set-Content $file $content -NoNewline
        Write-Host "Updated $file successfully"
    } else {
        Write-Host "File $file not found, skipping..."
    }
}

Write-Host "`nAll files updated!"
