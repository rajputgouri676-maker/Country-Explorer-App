// const API_KEY = "rc_live_fc123abd68e24911a0f177106a27019f";
// const BASE = "https://api.restcountries.com/countries/v5";
// const FIELDS = "names.common,codes.alpha_2,capitals,region,population";
// const CACHE_KEY = "countries-cache";

// const grid = document.querySelector("#grid");
// const statusE1 = document.querySelector("#status");
// const searchInput = document.querySelector("#search");
// const regionSelect = document.querySelector("#region");

// let allCountries = [];

// // Fetch Data (100 per page)
// async function fetchAllCountries() {
//   const result = [];
//   let offset = 0;
//   let more = true;
//   try {
//     while (more) {
//       const url = `${BASE}?response_fields=${FIELDS}&limit=100&offset=${offset}`;
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${API_KEY}` },
//       });
//       if (!res.ok) throw new Error("Server Error:" + res.status);
//       const json = await res.json();
//       result.push(...json.data.objects);
//       more = json.data.meta.more;
//       offset += 100;
//     }
//     console.log(result);
    
//     return result;
//   } catch (error) {
//     console.log(error, "Error in Fetching Data");
//   }
// }

// async function loadCountries() {
//   statusE1.textContent = "Loading Countries....";
//   try {
//     const saved = localStorage.getItem(CACHE_KEY);
//     allCountries = saved ? JSON.parse(saved) : await fetchAllCountries();
//     if (!saved) {
//       localStorage.setItem(CACHE_KEY, JSON.stringify(allCountries));
//     }
//     statusE1.textContent = "";
//   } catch (error) {
//     statusE1.textContent = "Could not load Data.";
//     console.log(error);
//   }
// }

// // function renderCountries(list){
// //     grid.innerHTML = list.map((c)=>{
// //     .map((c)=>{

// //     })

// //     })
// // }


// fetchAllCountries();


const API_KEY = "rc_live_25e1196637ad46bb81111e3a5480db04";
const BASE = "https://api.restcountries.com/countries/v5";
const FIELDS = "names.common,codes.alpha_2,capitals,region,population";
const CACHE_KEY = "countries-cache";

const grid = document.querySelector("#grid");
const statusEl = document.querySelector("#status");
const searchInput = document.querySelector("#search");
const regionSelect = document.querySelector("#region");

let allCountries = [];

// Fetch Data (100 per page)
async function fetchAllCountries() {
  const result = [];
  let offset = 0;
  let more = true;
  try {
    while (more) {
      const url = `${BASE}?response_fields=${FIELDS}&limit=100&offset=${offset}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      if (!res.ok) throw new Error("Server Error: " + res.status);

      const json = await res.json();
      result.push(...json.data.objects);
      more = json.data.meta.more;
      offset += 100;
    }
    // console.log(result);

    return result;
  } catch (error) {
    console.log(error, "Error in Fetching Data");
  }
}

async function loadCountries() {
  statusEl.textContent = "Loading Countries....";
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    allCountries = saved ? JSON.parse(saved) : await fetchAllCountries();

    if (!saved) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(allCountries));
    }

    statusEl.textContent = "";
    applyFilters();
  } catch (error) {
    statusEl.textContent = "Could not load Data.";
    console.log(error);
  }
}

function renderCountries(list) {
  grid.innerHTML = list
    .map((c) => {
      const code = c.codes.alpha_2.toLowerCase();
      const capital = c.capitals[0]?.name ?? "N/A";

      return `
    <div class="country-card bg-white rounded-xl shadow overflow-hidden">
      <img src="https://flags.restcountries.com/v5/w320/${code}.png"
           alt="Flag of ${c.names.common}" onerror="this.src='https://placehold.co/320x180?text=No+Flag'" class="w-full h-36 object-cover" />
      <div class="p-4">
        <h2 class="font-bold text-lg mb-2">${c.names.common}</h2>
        <p class="text-sm"><span class="font-semibold">Capital:</span> ${capital}</p>
        <p class="text-sm"><span class="font-semibold">Region:</span> ${c.region}</p>
        <p class="text-sm"><span class="font-semibold">Population:</span> ${c.population.toLocaleString() ?? "N/A"}</p>
      </div>
    </div>`;
    })
    .join("");
}

function applyFilters() {
  const text = searchInput.value.trim().toLowerCase();
  const region = regionSelect.value;

  const filtered = allCountries.filter(
    (c) =>
      c.names.common.toLowerCase().includes(text) &&
      (region === "" || c.region === region),
  );
  statusEl.textContent = filtered.length === 0 ? "No Countries Found" : "";
  renderCountries(filtered);
}

searchInput.addEventListener("input", applyFilters);
regionSelect.addEventListener("change", applyFilters);

loadCountries();





