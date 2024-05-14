mapboxgl.accessToken =
"pk.eyJ1IjoicmljaGFhZ2dhcndhbDA3IiwiYSI6ImNsZWNvOHYxeDAwOHkzcHBnb2ZtcHF4OXAifQ.sbkyCIrkBQIp32LurTNptg";
let data = {};

function displayName(value)
{
    city.value=value;
    document.getElementsByClassName('list')[0].innerHTML=''
}
async function getCoordinates(area)
{
  console.log('area &&&&', area)
  const conversionAPI=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?access_token=pk.eyJ1IjoicmljaGFhZ2dhcndhbDA3IiwiYSI6ImNsZWNvOHYxeDAwOHkzcHBnb2ZtcHF4OXAifQ.sbkyCIrkBQIp32LurTNptg`)
  const obj=await conversionAPI.json()
  console.log('obj', obj);
  if(obj.features[0]){
    let coordinates=obj.features[0].center
    return coordinates;
  }
}

async function delayMapPlot(map,data,marker)
{
  console.log('&&&&&')
              var bounds = map.getBounds();
              let ne=bounds._ne;
              let sw=bounds._sw;
                   

            console.log('first', data);
              const filteredData=data.length > 0 ? await getLatLong(data,ne.lng,sw.lng,ne.lat,sw.lat): [];
              console.log(filteredData);
              filteredData.map((items)=>
              {
                  let coordinates=items.address;
                  console.log('items', coordinates);
                  const el = document.createElement('div');
                  el.className = 'marker';
                     let value= new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
                      new mapboxgl.Popup({ offset: 25 }) 
                        .setHTML(
                            `<h3>${items.value}</h3>`
                        )
                    ).addTo(map);
                    marker.push(value);
              })
}

async function getLatLong(data,sl,el,slon,elon)
{
    let returnArray=[];
    for(let value of data)
    {
        let coordinates=await getCoordinates(value);
        console.log(value, coordinates);
        if(coordinates.length > 0)
        {
            returnArray.push({"address":coordinates,"value":value});
        }
    }
    console.log('returnArray', returnArray);
    return returnArray;
}

async function MapAddition(areaValue, data)
{
    console.log('map addition')
    let centerCoordinates=await getCoordinates(areaValue);
    const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: centerCoordinates, 
        zoom: 7,
        maxZoom:12,
        minZoom:4
        })
        let marker=[];
        let timeoutId = null;
            
          map.on('load',function() {
            console.log('Delhi');
            // Cancel any previously scheduled timeouts
            clearTimeout(timeoutId);
            for(let x of marker)
            {
              x.remove();
            }
            
          
            // Schedule a new timeout to show the boundaries after 5 seconds
            timeoutId = setTimeout(async function() {
                delayMapPlot(map,data,marker)        
            },500);
          });
    map.addControl(new mapboxgl.NavigationControl());
}

async function readLocation (){
  data = {
    "andhra pradesh": [
        "Green Waves Environmental Solution, SyNo. 43/1, Mindi (V),No. 43/1, Mindi (V), Gajuwaka (M),Visakhapatnam District",
        "Apna Bhoomi E-Waste Management Services, Sy. No. 119, Near Bharat Junction, Kusalapuram (V), Etcherla (M), Srikakulam District. - 532005",
        "Veera Waste Management Systems, Plot No. 42, IDA, Autonagar Visakhapatnam District.-530012",
        "Binbag Recycling Services Pvt. Ltd,Anatapur District ",
        " E-Parisaraa Pvt. Ltd, Plot No. 42A/4, Gollapuam, Hindupuram, Annathapuramu Distirct",
        "Ramky ARM Recycling Pvt. Ltd., Plot No. 84/A & B, Road, No. 20/5, JNPC, Parawada,Visakhapatnam District- 531019",
        "Clean Earth Green Earth Solutions,Krishna District ",
        "World Scrap Recycling Solutions (P) Ltd Plot No 50,Chittor District ",
        "Sungeel India Recycling Pvt. Ltd., Plot No. 59C & 59D, APIIC Industrial Park, Gollapuram(V), Hindupur (M), Anantapur District-515211"
    ],
    "assam": [
        "United Global Trust, F-5, Zoo Road, Senduri Ali Path, Guwahati, Dist. Kamrup (M) Assam "
    ],
    "chhattisgarh":[
        "Star E-Processors, Village-Baktara, P.O.- Godi, Tehsil-Arung, District- Raipur, Chhattisgarh ",
        "ADV Metal Combine Pvt. Ltd., Shed No. - 25, Borai Industrial Growth Center, Rasmada,Dist.- Durg (C.G)"
    ],
    "delhi":[
        "Shivnath Computers, E-47/2, 1st Floor, Okhla Phase-2, Delhi- 110019",
        "Fozia Traders, Khasra No.13/1, Saboli Mandoli Industrial Area, Delhi-110093",
        "Muskan Technologies, B-96,Okhla Industrial Area,Phase-1,Delhi- 110020",
        "Techchef E-Waste Solutions Private Limited, C-61, Top Floor, DDA Shed Okhla Industrial Area, Delhi-110020",
        "Greenscape Eco Management Private Ltd., 348, Patparganj Industrial Area, Delhi110020 ",
        "Shree Raman E-Waste, Plot No. 7, Khasra  No. 487, Peeragarhi Industrial Area, Peeragarhi Village, Delhi-110087" 
    ],
    "gujarat":[
    "E-coli Waste Management P. Ltd, Plot No.- 90 TO 92 Sabar Industrial Park Pvt. Ltd Vill"
    ],
    "goa":[
        " Global E Waste Management Systems Plot No: Shop No 729 , Sonum Township Nessai Salcete – Goa",
        "Group Ten Plus, H. No. 8/5, Abreovaddo ,Saligao, Bardez, Goa"
    ],
    "haryana":[
        "Honey Disposal Store, Plot No. 67-68 Jarrout Road, Village Mandour Industrial Area Ambala city.",
        "Thapar Disposal Industries, 902A/5/6,Chara Mandi Road, Ambala City",
        "Exigo Recycling Pvt. Ltd., G. T. Road,Samalkha Panipat",
        "Earth Waste Management Pvt. Ltd. VillIsmaila, Distt. Rohtak ",
        "Giriraj Metal, P. No. 39 HSIIDC, IE, Kutana,Rohtak ",
        "Green World International, Pvt. Ltd., GR 60-61 Ganpati Industrial Dham Industrial Area Bahadugarh Haryana",
        "Renu Recycling Company , Plot No. 1257, MIE-B, Bahadurgar",
        "E-waste Solutions, Industrial Shed, 1A,Industrial Estate, Sec-6, Faridabad",
        "Bluenvir, 81, HSIIDC, Rai, Distt. Sonipat",
        "EARTH SENSE RECYCLE PVT LTD, Plot No. 100, Sector - 5, IMT Manesar, Gurgaon",
        "Apicem Recyclers Pvt. Ltd., Plot No. 359,Sector-8, IMT Manesar, Gurugram, Haryana 5"
    ],
    "himachal pradesh":[
        "Shivalik Solid Waste Management Ltd.,(Unit –II), Village-Shabowal, Tehsil Nalagarh, District-Solan HP",
        "Ortech India Corporations, Plot No. 67-B,Industrial Estate, Lodhi Majra, Baddi,"
    ],
    "jammu and kashmir":[
        "VRG Groups, Gangyal",
        "Bashir Ahmad Babdemb, Srinagar",
        "Bashir Enterprises Noorbagh, Srinagar"
    ],
    "jharkhand":[
        "Meliorate Lubes Pvt Ltd, Plot No. 606/A,Ward No. 4/34, Vikas Nagar, hesal Piska More,Ranchi Jharkhand- 834005",
        "Simran Infotech, Vill & P.O Kanak Chas,P.S. Chandan Kiari dist. Kokaro Jharkhand-828134"
    ],
    "karnataka":[
        "Sriram Eco Raksha Computer Services Pvt. Ltd. No. B -29,KSSIDC Indl. Estate, Bommasandra, Hosur Road, Anekal Taluk, Bangalore– 560 099",
        "E-Friendly Waste Recyclers, First Floor,No. 17 1st, Cross, Azeez Sait Indus",
        "Eco Globe E-Waste Recyclers, Plot No.87, 2nd Phase, 2nd Sector, Bidadi Industrial Area, Bidadi Hobli, Ramanagra Taluk and District",
        "E-Hasiru, No. 168/B, 1st Floor, 7th Main Road, 3rd Phase, Peenya Industrial Area, Bangalore– 558",
        "Green Enabled IT Solutions Pvt. Ltd., No.2/1, 27th Cross, Behind Krishna Grand Hotel, Banashankari 2nd Stage, Bengaluru "
    ],
    "kerala":[
        "Kerala Enviro Infrastructure Ltd,Infrastructure Ltd E Waste Dismantling Facility,Common TSDF project, Inside Fact-CD Campus, Ambalamedu, Kochi 682303"
    ],
    "maharashtra":[
        "Arihant E Recycling Pvt Ltd, Gut No.307/1, Shahada Road, Dondaicha, Tal -Sinkheda, Dist-Dhule.",
        "Eco-Recycling Ltd., Eco-House, Near Top Glass Enclave, Bhoipada, Near Range Office, Sativali Road, Vasai (E), Dist.Palghar",
        "E-Incarnation Recycling Pvt. Ltd. Plot No. J-56,MIDC Area, Tarapur, Boiser, Dist: Palgar,Maharashtra- 401506",
        "Evergreen Recyclekaro India Pvt. Ltd., Gut. No.113/A, Village Pali,Tal. Wada, Dist. Palghar",
        "Hi-Tech Recycling (I) Pvt. Ltd, Property No.193,Gat No. 89, Pune-Satara Road, Shindewadi, Tal:Bhor, Dist: - Pune"
    ],
    "madhya pradesh":[
        "Unique Eco Recycle, Plot No. 26, Industrial Area, Palda, Indore ",
        "Moonstar Enterprises Pvt. Ltd., Plot No.24/A, 24/D, 24/A-1, 21/D, 21/E, 21/E-1, Sector-B, Sanwer Road, Industrial Area Indore",
        "Prometheus Recycling Private Limited,786/4, 799/1, 800,, Dilawar Ka pura, Susera, Tal:Gird Dist: Gwalior, SIDC"
    ],
    "orissa":[
        "Sani Clean (P) Ltd., Plot No. 802/947, at-Tangiapada, Niala, Dist-Khurda",
        "Varun infra Steel Pvt. Ltd. Plot No.1991/3942, At/P.O. Brahmani Tarang, Vedvyas,Rourkela-769004, Dist-Sundargarh",
        "Jagannath E -Waste Recyclers, At-Pinchuli, P.O. Purushottampur, Dist-Ganjam",
        "P K Enterprises, Plot No.293/525, Khata  No.127/4 At /P.O. Kalunga,Dist-Sundargar",
        "Mirtunjai Udyog(Dismantler), At-AA/2, CivilTownship, Rourkela Distt- Sundargarh",
        "Cosmic Net, B-25, Saheed Nagar,Bhubaneswar",
        "Ecokart Technology Pvt. Ltd., At/PO/Mouza -Kuradhamala, Daleiput, Dist - Khordha, M - 7008551392"
    ],
    "punjab":[
        "Ramky Enviro Engineer Ltd., Vill. Nimbuan,Tehsil Dera Bassi, District SAS Nagar",
        "Spreco Recycling, D-45, Industrial Area,Focal Point, Raikot, District Ludhiana",
        "K.J. Recycler, C-38, Sanjay Gandhi Nagar,Industrial Area, Jalandhar",
        "Black Diamond Cements Pvt. Ltd., (E-Waste Dismantling & Recycling Facility),Village Humayunpur, Nariangarh Road, TehsilDera Bassi, District SAS Nagar",
        "Cosmos Recycling Grewal Nagar, Street No. 2, VPO Hambran Jagroan, Ludhiana",
        "Stellar Recycling LLP Village Lakhowal (H.B.No.190 ), Tehsil & District Ludhiana"
    ],
    "rajasthan":[
        "H.M.E-waste Management G1-226, RIICO Ind.Area, Kehrani Bhiwadi (Extn.) Tijara Distt-Alwar",
        "ETCO E-waste Recycler pvt. ltd, SB-23,Shilp Bari Road, 1415 VKI Area, Jaipur",
        "EPRAGATHI Recycling Pvt. Ltd., P.No. 29, SKS Industrial Area Ringus, Tehsil- Srimadhopur, Distt- Sikar- 332404",
        "Fateh Enviro Lab, Khasra No. 1036/14,Industrial Area, Jasol,Balotra, Barmer 344022",
        "Vinay Traders, F-241-242, RIICO Ind. Area,Palra, Ajmer"
    ],
    "tamil nadu":[
        "Genbruze Solutions Pvt. ltd., S. F. No. 9.28,29pt, Athipattu Village, Ambattur Taluk,Chennai District",
        "Tritech Systems, No.165/3, Porur,Chennai- 116",
        "Ecosible Recyclers Pvt Ltd, No.154A/B,8th Mahatma Gandhi Road, Tass Industrial Estate,Ambattur, Chennai – 600098.",
        "Green Era Recyclers 37, Sivanandha Industries Estate, Dr. M.S. Udhayamurthy Nagar, Thadagam Road, Edayarpalayam,Coimbatore District - 641025",
        "Shri Raaam Recycling, No. DP-29, SIDCO Industrial Estate, SIPCOT Industrial Complex,Gummidipoondi- 601201"
    ],
    "telangana":[
        "Earth Sense Recycle Pvt.Ltd., Plot No.37, APIIC Industrial park, Mankal (V), Maheswaram(M), Rangareddy District. Telangana-501359",
        "Silicon Planet Recycling Pvt. Ltd.,Sy.No.811/A, Ankireddypally (V) &Grampanchayat Keesara (M) , Medchal Malkajgiri Distric",
        "Shreem Mythri Enterprises, Plot No.50,phase-III,IDA Cherlapally, kapra (M), Medchal -Malkajgiri District",
        "Elifecycle Management Private Limited, Sy.No. 468, 470, 471 & 472, Theegapur, Kothur Rangareddy District",
        "Malpani Antenna Electronics Pvt. Ltd., Plot No. D4, Phase -I, IDA, Pashamailaram, Patancheru (M), Sangareddy District"
    ],
    "uttar pradesh":[
        "Auctus– E Recycling Solutions Pvt. Ltd.,F-637, M. G. Road, Industrial Area, Ghaziabad",
        "Rocket Sales, Plot No. 1-12, I/A, M. G.Road, Hapur",
        "R.R. Recycler Pvt. Ltd., Khasra No.-115, M,Vill- Achraunda, Tehsil & District- Meerut",
        "3R Recycler Pvt Ltd. Unit 2, Plot No. A-61/2,UPSIDC Industrial Area, Sikandrabad,Bulandshahar, Buland Shahar- 203202 UttarPradesh",
        "Auctus Recycling Solutions Pvt. Ltd,Habibpur, Greater Noida "
    ],
    "uttarakhand":[
        "Bharat Oil & Waste Management ltd. Mauja Mukimpur, Laksar, Haridwar",
        "Anmol Paryavaran Sanrakshan Samiti,Daulatpur Hazaratpur urf, Budhwasahid,Daulatpur",
        "Resource E-Waste Solution Pvt.Ltd. F-97,Industrial area, Bhadrabad, Haridwar",
        "Starto Metal Recycle plant , Kh. No-314 Kh,village –Mehvar Khurd, Roorkee",
        "Nayak Enterprises, Village Dhakia, No. 1,Post Kundeshwari, Tehsil Kashipur, DistrictUdham Singh Nagar, Kashipur, Uttrakhand,244713, India"
    ],
    "west bengal":[
        "J.S. Pigments Pvt. ltd, Vill.+ P.O.-Jarua, P.S.-Polba, Hoogly-712138",
        "Lubrina Recycling Pvt. ltd., P.O. Bakrahat,P.S. Bishnupur, Distt.-24 Pgs(S), Pin-743377.",
        "P. U. Steel and Electro Process pvt. Ltd.,Ruiya Industrial complex P.O. Patuliar PSKhadar Distt. 24, PGS (N), West Bengal - 750119",
        "Old N Furniture 323, K.P. Mondal Road, PO & PS Budge Budge, Dist-24 PGS(S), Pin-700137",
        "Bhanu Metal Industries, Vill. Khamar, P.O.-Rajarhat, P.S.-Rajarhat, Dist. 24, PGS (N)-700135"
    ]
}

}
readLocation();
MapAddition('Madhya Pradesh', {});
document.getElementById('submit').addEventListener(('click'),async (event)=>
{
  event.preventDefault();
    let area=document.getElementById('city');
    const areaValue = area.value;
    console.log('area', area);
    const ewasteData = data;
    console.log('ewaste', ewasteData);
    const lowercase = Object.keys(ewasteData).map(value => value.toLowerCase());
    console.log('lowercase', lowercase);
    if(areaValue.length > 0 && lowercase.includes(areaValue.toLowerCase())){
        const areaList = ewasteData[areaValue.toLowerCase()];
        MapAddition(areaValue, areaList);
    }
    area.value = '';
})


