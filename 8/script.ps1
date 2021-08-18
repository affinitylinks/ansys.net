$csvData = Import-Csv filelist.csv

foreach($row in $csvData){
    Invoke-WebRequest -Uri $row.url -OutFile $row.output
}