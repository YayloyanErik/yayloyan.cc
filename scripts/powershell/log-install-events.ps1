Get-WinEvent -FilterHashtable @{LogName='Setup'; ID=11707} | Format-List TimeCreated, Message