// routes/seed.js
const express = require('express');
const router = express.Router();
const Orphanage = require('../models/orphanage');

// Clear all orphanages (use carefully)
router.get('/clear', async (req, res) => {
  try {
    await Orphanage.deleteMany({});
    return res.json({ message: 'All orphanages cleared' });
  } catch (err) {
    console.error('Seed clear error', err);
    return res.status(500).json({ error: err.message });
  }
});

// Add/upsert sample orphanages (safe)
router.get('/add', async (req, res) => {
  try {
    const samples = [
      {
        id: 'sunshine-orphanage',
        name: 'Sunshine Orphanage',
        tagline: 'A safe home for every child',
        short: 'Shelter, education & care since 2005',
        description: 'Sunshine Orphanage provides shelter, education and healthcare to children in need. We focus on holistic development and community support.',
        mission: 'Provide safe & nurturing environment, ensure education and emotional well-being.',
        location: 'Coimbatore, Tamil Nadu, India',
        phone: '+91 98765 43210',
        email: 'sunshine@example.org',
        visitingHours: 'Mon–Sat, 10:00 — 16:00 (by appointment)',
        established: 2005,
        coverImage: '/images/sunshine-cover.jpg',
        gallery: ['/images/sunshine1.jpg','/images/sunshine2.jpg','/images/sunshine3.jpg'],
        facilities: ['Dormitories','Classroom','Playground','Kitchen','Medical Room','Library'],
        counts: { children: 47, volunteers: 18, staff: 8 },
        donationIntro: 'Your donation helps us with food, education & healthcare.',
        donationBreakdown: ['Daily meals','School fees','Medical care','Clothing & essentials'],
        volunteerIntro: 'We welcome volunteers for teaching, events, healthcare assistance and mentorship.',
        children: [
          { firstName: 'Riya', age: 7, shortBio: 'Loves drawing & stories.', photo: '/images/child1.jpg', consentForPublishing: false, interests: 'Drawing' },
          { firstName: 'Arun', age: 10, shortBio: 'Enjoys football & maths.', photo: '/images/child2.jpg', consentForPublishing: false, interests: 'Football' }
        ]
      },

      {
        id: 'hope-haven',
        name: 'Hope Haven Orphanage',
        tagline: 'Hope & education for all',
        short: 'Community-driven care and learning.',
        description: 'Hope Haven provides long-term care with strong focus on education and skills training.',
        mission: 'Empower children through education and life skills.',
        location: 'Chennai, Tamil Nadu, India',
        phone: '+91 91234 56789',
        email: 'contact@hopehaven.org',
        visitingHours: 'Tue–Sun, 09:00 — 17:00',
        established: 2010,
        coverImage: '/images/hope-cover.jpg',
        gallery: ['/images/hope1.jpg','/images/hope2.jpg'],
        facilities: ['Study hall','Computer lab','Health clinic','Playground'],
        counts: { children: 35, volunteers: 12, staff: 6 },
        donationIntro: 'Support education and vocational training programs.',
        donationBreakdown: ['School supplies','Skill workshops','Meals'],
        volunteerIntro: 'Teachers and mentors are always welcome.',
        children: [
          { firstName: 'Sneha', age: 6, shortBio: 'Very curious & active.', photo: '/images/child3.jpg', consentForPublishing: false, interests: 'Singing' }
        ]
      },

      {
        id: 'safe-haven',
        name: 'Safe Haven Orphanage',
        tagline: 'Security, care, growth',
        short: 'Safe Haven focuses on mental health and wellbeing.',
        description: 'Safe Haven is a therapeutic home providing special care and counselling for children who need extra emotional support.',
        mission: 'Heal, educate and integrate children into supportive communities.',
        location: 'Pune, Maharashtra, India',
        phone: '+91 99887 77665',
        email: 'info@safehaven.org',
        visitingHours: 'Mon–Fri 10:00 — 15:00 (by prior appointment)',
        established: 2008,
        coverImage: '/images/safe-cover.jpg',
        gallery: ['/images/safe1.jpg','/images/safe2.jpg'],
        facilities: ['Therapy rooms','Counseling','After-school programs','Garden'],
        counts: { children: 30, volunteers: 9, staff: 7 },
        donationIntro: 'Help fund therapy & educational programs.',
        donationBreakdown: ['Therapy sessions','School costs','Health care'],
        volunteerIntro: 'Counselors and mentors are needed regularly.',
        children: []
      },

      {
        id: 'bright-futures',
        name: 'Bright Futures Orphanage',
        tagline: 'Building bright futures',
        short: 'Education-forward care and mentoring.',
        description: 'Bright Futures focuses on STEM education and career guidance.',
        mission: 'Equip children with skills to succeed in life and work.',
        location: 'Mumbai, Maharashtra, India',
        phone: '+91 91111 22233',
        email: 'hello@brightfutures.org',
        visitingHours: 'Sat & Sun, 10:00 — 14:00',
        established: 2012,
        coverImage: '/images/bright-cover.jpg',
        gallery: ['/images/bright1.jpg','/images/bright2.jpg','/images/bright3.jpg'],
        facilities: ['Science Lab','Classrooms','Sports field','Career center'],
        counts: { children: 55, volunteers: 22, staff: 12 },
        donationIntro: 'Sponsor education and training programs.',
        donationBreakdown: ['STEM labs','Scholarships','Sports & nutrition'],
        volunteerIntro: 'Mentors & tutors encouraged.',
        children: []
      },

      {
        id: 'guardian-angels',
        name: 'Guardian Angels Orphanage',
        tagline: 'Compassion in action',
        short: 'Holistic care including health and vocational support.',
        description: 'Guardian Angels provides family-like care and vocational training for older children.',
        mission: 'Prepare youth to live independently and positively.',
        location: 'Hyderabad, Telangana, India',
        phone: '+91 90000 11122',
        email: 'contact@guardianangels.org',
        visitingHours: 'Mon–Sat 09:00 — 17:00',
        established: 2000,
        coverImage: '/images/guardian-cover.jpg',
        gallery: ['/images/guardian1.jpg'],
        facilities: ['Workshops','Vocational training','Healthcare'],
        counts: { children: 28, volunteers: 13, staff: 10 },
        donationIntro: 'Support vocational programs and housing.',
        donationBreakdown: ['Workshops','Transitional housing','Healthcare'],
        volunteerIntro: 'Skilled-volunteers for vocational training needed.',
        children: []
      },

      {
        id: 'future-stars',
        name: 'Future Stars Orphanage',
        tagline: 'Nurturing talent',
        short: 'Focus on arts, sports and academic growth.',
        description: 'Future Stars encourages every child to explore talents through extracurriculars.',
        mission: 'Help children find and pursue their strengths.',
        location: 'Kerala, India',
        phone: '+91 88888 77766',
        email: 'info@futurestars.org',
        visitingHours: 'Weekdays 10:00 — 16:00',
        established: 2015,
        coverImage: '/images/future-cover.jpg',
        gallery: ['/images/future1.jpg','/images/future2.jpg'],
        facilities: ['Music room','Sports arena','Classrooms','Library'],
        counts: { children: 36, volunteers: 11, staff: 9 },
        donationIntro: 'Sponsor arts & sports activities.',
        donationBreakdown: ['Coaching','Instruments','Sports gear'],
        volunteerIntro: 'Coaches and teachers welcome.',
        children: []
      },

      // assistant choices
      {
        id: 'shining-hope',
        name: 'Shining Hope Shelter',
        tagline: 'Light the way forward',
        short: 'A caring shelter focused on health and daily needs.',
        description: 'Shining Hope provides essential care for infants and young children, with attention to nutrition and early education.',
        mission: 'Ensure healthy development during early years.',
        location: 'Nagpur, Maharashtra, India',
        phone: '+91 77777 44455',
        email: 'connect@shininghope.org',
        visitingHours: 'Mon–Fri 11:00 — 16:00',
        established: 2003,
        coverImage: '/images/shining-cover.jpg',
        gallery: [],
        facilities: ['Infant care','Nutrition program','Early learning'],
        counts: { children: 22, volunteers: 6, staff: 8 },
        donationIntro: 'Help feed and support young children.',
        donationBreakdown: ['Nutrition','Vaccinations','Early education'],
        volunteerIntro: 'Healthcare volunteers welcome.',
        children: []
      },

      {
        id: 'rainbow-home',
        name: 'Rainbow Home Center',
        tagline: 'Colorful futures',
        short: 'A community hub with education & care programs.',
        description: 'Rainbow Home runs after-school programs and community activities so children thrive academically and socially.',
        mission: 'Create inclusive learning opportunities.',
        location: 'Delhi, India',
        phone: '+91 66666 33322',
        email: 'support@rainbowhome.org',
        visitingHours: 'Sat & Sun 10:00 — 18:00',
        established: 2009,
        coverImage: '/images/rainbow-cover.jpg',
        gallery: ['/images/rainbow1.jpg'],
        facilities: ['After-school center','Arts studio','Community kitchen'],
        counts: { children: 60, volunteers: 20, staff: 15 },
        donationIntro: 'Fund after-school and community programs.',
        donationBreakdown: ['After-school','Meals','Workshops'],
        volunteerIntro: 'Activity leaders and tutors sought.',
        children: []
      }
    ];

    // safe upsert — insert or update existing (avoids duplicates)
    for (const item of samples) {
      await Orphanage.updateOne({ id: item.id }, { $set: item }, { upsert: true });
    }

    return res.json({ message: 'Seed completed (upserted 8 orphanages)' });
  } catch (err) {
    console.error('Seed error', err);
    return res.status(500).json({ error: 'Seed error', details: err.message });
  }
});

module.exports = router;
