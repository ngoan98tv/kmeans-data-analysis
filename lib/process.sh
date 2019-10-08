xlsx2csv "$1" "$1.csv"
sed -i "/^,/d" "$1.csv"
head -1 "$1.csv"
