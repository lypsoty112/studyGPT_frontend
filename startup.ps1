$projectPath = "C:\Users\Maarten Boon\Documents\projects\studyGPT_frontend"

# Check if the directory exists
if (Test-Path $projectPath -PathType Container) {
    # Change the current directory to your React project directory
    Set-Location -Path $projectPath

    # Start the React development server
    npm run dev
} else {
    Write-Host "React project directory not found at $projectPath"
}