xlsx2csv "$1" "$2"
sed -i "/^,/d" "$2"
head -1 "$2"