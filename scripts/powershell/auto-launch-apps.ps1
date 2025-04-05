$appPath = 'C:\MyApp\app.exe'
New-Item -ItemType SymbolicLink -Path "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup" -Target $appPath