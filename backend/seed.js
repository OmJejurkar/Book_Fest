const mongoose = require('mongoose');
const Event = require('./models/Event');
const Link = require('./models/Link');
require('dotenv').config();

// Sample event data for Pune Book Fest 2025
const eventsData = [
  // Day 1 - January 10, 2025
  {
    day: 1,
    date: 'January 10, 2025',
    time: '9:00 AM',
    title: 'Opening Ceremony',
    speaker: 'Chief Guest: Amish Tripathi',
    location: 'Main Auditorium',
    description: 'Grand opening of Pune Book Fest 2025 with cultural performances'
  },
  {
    day: 1,
    date: 'January 10, 2025',
    time: '11:00 AM',
    title: 'Author Talk: The Art of Storytelling',
    speaker: 'Chetan Bhagat',
    location: 'Hall A',
    description: 'Interactive session on modern Indian writing and storytelling'
  },
  {
    day: 1,
    date: 'January 10, 2025',
    time: '2:00 PM',
    title: 'Poetry Slam Competition',
    speaker: 'Various Artists',
    location: 'Open Air Theatre',
    description: 'Young poets showcase their talent in this exciting competition'
  },
  {
    day: 1,
    date: 'January 10, 2025',
    time: '5:00 PM',
    title: 'Music & Poetry Session',
    speaker: 'Javed Akhtar',
    location: 'Main Auditorium',
    description: 'An evening of soulful poetry and music'
  },
  
  // Day 2 - January 11, 2025
  {
    day: 2,
    date: 'January 11, 2025',
    time: '10:00 AM',
    title: 'Children\'s Book Reading Session',
    speaker: 'Sudha Murty',
    location: 'Children\'s Corner',
    description: 'Stories and moral tales for young readers'
  },
  {
    day: 2,
    date: 'January 11, 2025',
    time: '12:00 PM',
    title: 'Publishing Workshop',
    speaker: 'Karthik Venkatesh',
    location: 'Conference Room 1',
    description: 'Learn about self-publishing and traditional publishing paths'
  },
  {
    day: 2,
    date: 'January 11, 2025',
    time: '3:00 PM',
    title: 'Panel Discussion: Digital vs Physical Books',
    speaker: 'Multiple Authors',
    location: 'Hall B',
    description: 'Debate on the future of reading in the digital age'
  },
  {
    day: 2,
    date: 'January 11, 2025',
    time: '6:00 PM',
    title: 'Book Launch: New Marathi Literature',
    speaker: 'Shobhaa De',
    location: 'Main Auditorium',
    description: 'Launch of contemporary Marathi literary works'
  },
  
  // Day 3 - January 12, 2025
  {
    day: 3,
    date: 'January 12, 2025',
    time: '10:00 AM',
    title: 'Writing Workshop for Beginners',
    speaker: 'Ruskin Bond',
    location: 'Workshop Hall',
    description: 'Tips and techniques for aspiring writers'
  },
  {
    day: 3,
    date: 'January 12, 2025',
    time: '1:00 PM',
    title: 'Book Fair & Exhibition',
    speaker: 'All Publishers',
    location: 'Exhibition Ground',
    description: 'Browse and buy from over 200 publishers and bookstores'
  },
  {
    day: 3,
    date: 'January 12, 2025',
    time: '4:00 PM',
    title: 'Meet & Greet with Authors',
    speaker: 'Various Authors',
    location: 'Signing Booth',
    description: 'Get your books signed by your favorite authors'
  },
  {
    day: 3,
    date: 'January 12, 2025',
    time: '7:00 PM',
    title: 'Closing Ceremony & Awards',
    speaker: 'Shashi Tharoor',
    location: 'Main Auditorium',
    description: 'Award ceremony and closing remarks'
  }
];

// Sample links data
const linksData = [
  {
    name: 'youtube',
    url: 'https://www.youtube.com/@punebookfest2025',
    type: 'social',
    description: 'Watch event highlights and author interviews'
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/punebookfest2025',
    type: 'social',
    description: 'Follow us on Facebook for daily updates'
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/punebookfest2025',
    type: 'social',
    description: 'Check out our Instagram for behind-the-scenes content'
  },
  {
    name: 'website',
    url: 'https://www.punebookfest2025.com',
    type: 'website',
    description: 'Official website of Pune Book Fest 2025'
  },
  {
    name: 'location',
    url: 'https://maps.google.com/?q=Symbiosis+International+University+Pune',
    type: 'location',
    description: 'Symbiosis International University, Gramajit Vimannagar Road, Pune'
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Event.deleteMany({});
    await Link.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert events
    await Event.insertMany(eventsData);
    console.log('📅 Events seeded successfully');

    // Insert links
    await Link.insertMany(linksData);
    console.log('🔗 Links seeded successfully');

    console.log('✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
