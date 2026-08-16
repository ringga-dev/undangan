<template>
  <nav class="navbar navbar-expand fixed-bottom rounded-top-4 p-0" id="navbar-example2">
    <ul class="navbar-nav nav-justified w-100 align-items-center">
      <li class="nav-item"><a class="nav-link" href="#home"><i class="fas fa-home"></i><span class="d-block" style="font-size:.7rem">Home</span></a></li>
      <li class="nav-item"><a class="nav-link" href="#mempelai"><i class="fa-solid fa-user-group"></i><span class="d-block" style="font-size:.7rem">Mempelai</span></a></li>
      <li class="nav-item"><a class="nav-link" href="#tanggal"><i class="fa-solid fa-calendar-check"></i><span class="d-block" style="font-size:.7rem">Tanggal</span></a></li>
      <li class="nav-item"><a class="nav-link" href="#ucapan"><i class="fa-solid fa-comments"></i><span class="d-block" style="font-size:.7rem">Ucapan</span></a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--c-surface);
  color: var(--c-text);
  border-top: 1px solid rgba(128, 128, 128, .25);
}
.nav-link { color: var(--c-text); opacity: .8; }
.nav-link:hover, .navbar .nav-link.active { opacity: 1; color: var(--c-accent); }
</style>
