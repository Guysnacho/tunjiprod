<template>
  <!-- Google tag (gtag.js) -->
  <Script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-GM9FF7LJKY"
  ></Script>
  <Script>
    window.dataLayer = window.dataLayer || []; function
    gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config',
    'G-GM9FF7LJKY');
  </Script>

  <NuxtLoadingIndicator />
  <div>
    <Nav />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Footer />
  </div>
</template>
