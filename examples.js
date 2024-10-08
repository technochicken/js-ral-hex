<script src="convert.js"></script>

<script>
// Example usage of the RALConverter after data is loaded
setTimeout(() => {
    console.log(RALConverter.hexToRal('#CDBA88')); // { ral: "RAL 1000", name: "Green beige" }
    console.log(RALConverter.ralToHex('RAL 1001')); // "#D0B084"
    console.log(RALConverter.ralToName('RAL 1002')); // "Sand yellow"
}, 2000);  // Delay added to ensure CSV is loaded
</script>
