# Stop any existing node or cloudflared processes on port 3000
Get-Process node, cloudflared -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*Challenge 7*" -or $_.Name -eq "cloudflared" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Start production web server
$nodeProcess = Start-Process node -ArgumentList "serve.js" -PassThru
Start-Sleep -Seconds 2

# Remove old tunnel log if exists
if (Test-Path "tunnel.log") { Remove-Item "tunnel.log" -Force }

# Start Cloudflare Tunnel logging to tunnel.log
$cfProcess = Start-Process .\cloudflared.exe -ArgumentList "tunnel --url http://localhost:3000" -RedirectStandardError "tunnel.log" -PassThru

# Wait for public URL to appear in tunnel.log
$url = $null
$attempts = 0
while ($attempts -lt 30) {
    Start-Sleep -Seconds 1
    $attempts++
    if (Test-Path "tunnel.log") {
        $content = Get-Content "tunnel.log" -Raw -ErrorAction SilentlyContinue
        if ($content -match "https://[a-zA-Z0-9-]+\.trycloudflare\.com") {
            $url = $matches[0]
            break
        }
    }
}

if ($url) {
    Write-Output "LIVE_PUBLIC_URL=$url"
    Write-Output "NODE_PID=$($nodeProcess.Id)"
    Write-Output "CF_PID=$($cfProcess.Id)"
} else {
    Write-Output "ERROR: Could not get public tunnel URL within timeout."
    if (Test-Path "tunnel.log") {
        Get-Content "tunnel.log" -Tail 20
    }
}
