// Nigeria states with proper coordinates and data
const nigeriaStatesData = {
  // Northern States
  'Sokoto': { 
    capital: 'Sokoto', 
    population: '4.9M', 
    founded: '1976',
    region: 'Northwest',
    description: 'Known for its rich Islamic heritage and the Sokoto Caliphate history.'
  },
  'Zamfara': { 
    capital: 'Gusau', 
    population: '4.5M', 
    founded: '1996',
    region: 'Northwest',
    description: 'Rich in gold mining and agricultural activities.'
  },
  'Kebbi': { 
    capital: 'Birnin Kebbi', 
    population: '4.4M', 
    founded: '1991',
    region: 'Northwest',
    description: 'Major rice producing state along the Niger River.'
  },
  'Katsina': { 
    capital: 'Katsina', 
    population: '7.8M', 
    founded: '1987',
    region: 'Northwest',
    description: 'Birthplace of President Muhammadu Buhari, known for agriculture.'
  },
  'Kano': { 
    capital: 'Kano', 
    population: '13.4M', 
    founded: '1967',
    region: 'Northwest',
    description: 'Most populous state, major commercial and industrial center.'
  },
  'Jigawa': { 
    capital: 'Dutse', 
    population: '5.8M', 
    founded: '1991',
    region: 'Northwest',
    description: 'Agricultural state known for groundnut and cotton production.'
  },
  'Kaduna': { 
    capital: 'Kaduna', 
    population: '8.3M', 
    founded: '1967',
    region: 'Northwest',
    description: 'Industrial hub and former capital of Northern Nigeria.'
  },
  'Bauchi': { 
    capital: 'Bauchi', 
    population: '6.5M', 
    founded: '1976',
    region: 'Northeast',
    description: 'Home to Yankari National Park and rich mineral resources.'
  },
  'Yobe': { 
    capital: 'Damaturu', 
    population: '3.3M', 
    founded: '1991',
    region: 'Northeast',
    description: 'Agricultural state in the Sahel region.'
  },
  'Borno': { 
    capital: 'Maiduguri', 
    population: '5.9M', 
    founded: '1976',
    region: 'Northeast',
    description: 'Largest state by area, birthplace of the Kanuri empire.'
  },
  'Adamawa': { 
    capital: 'Yola', 
    population: '4.2M', 
    founded: '1991',
    region: 'Northeast',
    description: 'Known for the Adamawa Plateau and diverse ethnic groups.'
  },
  'Gombe': { 
    capital: 'Gombe', 
    population: '3.3M', 
    founded: '1996',
    region: 'Northeast',
    description: 'Known for its educational institutions and agriculture.'
  },
  'Taraba': { 
    capital: 'Jalingo', 
    population: '3.1M', 
    founded: '1991',
    region: 'Northeast',
    description: 'Most ethnically diverse state with over 80 ethnic groups.'
  },
  
  // Middle Belt States
  'Niger': { 
    capital: 'Minna', 
    population: '5.6M', 
    founded: '1976',
    region: 'North Central',
    description: 'Largest state by area, home to Abuja and hydroelectric power.'
  },
  'FCT': { 
    capital: 'Abuja', 
    population: '3.6M', 
    founded: '1976',
    region: 'North Central',
    description: 'Federal Capital Territory, seat of Nigerian government.'
  },
  'Kwara': { 
    capital: 'Ilorin', 
    population: '3.2M', 
    founded: '1967',
    region: 'North Central',
    description: 'Gateway between Northern and Southern Nigeria.'
  },
  'Kogi': { 
    capital: 'Lokoja', 
    population: '4.5M', 
    founded: '1991',
    region: 'North Central',
    description: 'Confluence state where Rivers Niger and Benue meet.'
  },
  'Nasarawa': { 
    capital: 'Lafia', 
    population: '2.5M', 
    founded: '1996',
    region: 'North Central',
    description: 'Known for solid minerals and agricultural production.'
  },
  'Plateau': { 
    capital: 'Jos', 
    population: '4.2M', 
    founded: '1976',
    region: 'North Central',
    description: 'Tin mining center with temperate climate on the Jos Plateau.'
  },
  'Benue': { 
    capital: 'Makurdi', 
    population: '5.7M', 
    founded: '1976',
    region: 'North Central',
    description: 'Food basket of the nation, major agricultural producer.'
  },
  
  // Southern States
  'Ogun': { 
    capital: 'Abeokuta', 
    population: '5.2M', 
    founded: '1976',
    region: 'Southwest',
    description: 'Gateway state, major industrial and manufacturing hub.'
  },
  'Lagos': { 
    capital: 'Ikeja', 
    population: '15.4M', 
    founded: '1967',
    region: 'Southwest',
    description: 'Economic capital of Nigeria, major commercial center.'
  },
  'Oyo': { 
    capital: 'Ibadan', 
    population: '7.8M', 
    founded: '1976',
    region: 'Southwest',
    description: 'Home to the ancient Oyo Empire and University of Ibadan.'
  },
  'Osun': { 
    capital: 'Osogbo', 
    population: '4.7M', 
    founded: '1991',
    region: 'Southwest',
    description: 'Cultural center known for Osun-Osogbo Sacred Grove.'
  },
  'Ekiti': { 
    capital: 'Ado-Ekiti', 
    population: '3.3M', 
    founded: '1996',
    region: 'Southwest',
    description: 'Land of knowledge, highest literacy rate in Nigeria.'
  },
  'Ondo': { 
    capital: 'Akure', 
    population: '4.7M', 
    founded: '1976',
    region: 'Southwest',
    description: 'Major cocoa producing state with oil reserves.'
  },
  'Edo': { 
    capital: 'Benin City', 
    population: '4.2M', 
    founded: '1991',
    region: 'South South',
    description: 'Home to the ancient Benin Kingdom and bronze artworks.'
  },
  'Delta': { 
    capital: 'Asaba', 
    population: '5.7M', 
    founded: '1991',
    region: 'South South',
    description: 'Major oil producing state in the Niger Delta.'
  },
  'Bayelsa': { 
    capital: 'Yenagoa', 
    population: '2.3M', 
    founded: '1996',
    region: 'South South',
    description: 'Oil-rich state, birthplace of former President Goodluck Jonathan.'
  },
  'Rivers': { 
    capital: 'Port Harcourt', 
    population: '7.3M', 
    founded: '1967',
    region: 'South South',
    description: 'Oil capital of Nigeria, major industrial center.'
  },
  'Akwa Ibom': { 
    capital: 'Uyo', 
    population: '5.5M', 
    founded: '1987',
    region: 'South South',
    description: 'Highest oil producing state with modern infrastructure.'
  },
  'Cross River': { 
    capital: 'Calabar', 
    population: '3.7M', 
    founded: '1967',
    region: 'South South',
    description: 'Tourism destination known for Calabar Carnival.'
  },
  'Enugu': { 
    capital: 'Enugu', 
    population: '4.4M', 
    founded: '1991',
    region: 'Southeast',
    description: 'Coal city, former capital of Eastern Nigeria.'
  },
  'Ebonyi': { 
    capital: 'Abakaliki', 
    population: '2.9M', 
    founded: '1996',
    region: 'Southeast',
    description: 'Salt of the nation, known for rice production.'
  },
  'Anambra': { 
    capital: 'Awka', 
    population: '5.5M', 
    founded: '1991',
    region: 'Southeast',
    description: 'Commercial hub with high entrepreneurial activity.'
  },
  'Imo': { 
    capital: 'Owerri', 
    population: '5.4M', 
    founded: '1976',
    region: 'Southeast',
    description: 'Eastern heartland, known for palm oil production.'
  },
  'Abia': { 
    capital: 'Umuahia', 
    population: '3.7M', 
    founded: '1991',
    region: 'Southeast',
    description: 'God\'s own state, major commercial center in Aba.'
  }
};

export default nigeriaStatesData;

