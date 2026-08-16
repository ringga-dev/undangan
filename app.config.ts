export default defineAppConfig({
  undangan: {
    title: 'Undangan Pernikahan Ringga & Delvy',
    cover: 'images/bg.jpeg',
    groom: {
      name: 'Ringga Septia Pribadi',
      parents: 'Anak Bapak .... & Ibuk ....',
      photo: 'images/cowo.png'
    },
    bride: {
      name: 'Delvy Lim',
      parents: 'Anak Bapak .... & Ibuk ....',
      photo: 'images/cewe.png'
    },
    dateText: 'Senin, 21 September 2026',
    countdown: '2026-09-21 07:00:00',
    calendarUrl:
      'https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=Nm5sY3BqMWhpbDFqdm1yZDRxZmU3N2M5bTggcmluZ2dhbXVuZ285N0Bt&tmsrc=ringgamungo97%40gmail.com',
    akad: 'Pukul 07.00 WIB - Selesai',
    resepsi: 'Pukul 09.00 WIB - Selesai',
    mapsUrl: 'https://goo.gl/maps/nLr9UEJwnpFSmBgUA',
    address: 'RT 10 RW 02, Desa Pajerukan, Kec. Kalibagor, Kab. Banyumas, Jawa Tengah 53191',
    music: 'music/A_Little_Piece_Of_Heaven.mp3',
    gifts: [
      {
        bank: 'BNI',
        logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png',
        norek: '.......',
        nama: 'Nama Reg'
      },
      {
        bank: 'BRI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png',
        norek: '....',
        nama: 'Nama Reg'
      }
    ],
    emailjs: {
      serviceId: 'service_6i0tgfr',
      templateId: 'template_yfam89e',
      fromEmail: 'ringgaseptia97@gmail.com'
    }
  }
})
