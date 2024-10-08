<!-- Include Papa Parse for CSV Parsing -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

<script>
// CSV source URL
const csvURL = 'https://gist.github.com/lunohodov/1995178.js';

let ralTable = {};  // Will store RAL code mappings

// Fetch and parse the CSV
function loadRALData() {
    Papa.parse(csvURL, {
        download: true,
        header: true,
        complete: function(results) {
            ralTable = processCSVData(results.data);
        }
    });
}

// Convert CSV data to an easy lookup object
function processCSVData(data) {
    const lookupTable = {};
    data.forEach(row => {
        const ralCode = row.RAL.trim();
        lookupTable[ralCode] = {
            hex: row.HEX,
            name: row.English,
            rgb: row.RGB,
            cmyk: row.CMYK,
            lrv: row.LRV
        };
    });
    return lookupTable;
}

// Class for converting RAL, HEX, and Names
class RALConverter {
    // Convert RAL code to HEX
    static ralToHex(ral) {
        if (ralTable[ral]) {
            return ralTable[ral].hex;
        } else {
            return { error: "RAL code not found." };
        }
    }

    // Convert HEX to RAL and name
    static hexToRal(hex) {
        hex = hex.toUpperCase();
        const ralEntry = Object.entries(ralTable).find(([key, value]) => value.hex.toUpperCase() === hex);
        if (ralEntry) {
            return { ral: ralEntry[0], name: ralEntry[1].name };
        } else {
            return { error: "HEX code not found in the table." };
        }
    }

    // Convert RAL code to RAL name
    static ralToName(ral) {
        if (ralTable[ral]) {
            return ralTable[ral].name;
        } else {
            return { error: "RAL code not found." };
        }
    }
    
    // Convert HEX to RAL name
    static hexToName(hex) {
        hex = hex.toUpperCase();
        const ralEntry = Object.entries(ralTable).find(([key, value]) => value.hex.toUpperCase() === hex);
        if (ralEntry) {
            return ralEntry[1].name;
        } else {
            return { error: "HEX code not found." };
        }
    }
}

// Load the CSV data on page load
loadRALData();
</script>
