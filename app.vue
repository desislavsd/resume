<script setup async>
const { data } = await useAsyncData('resume', async () => {
  const [skills, experience, projects] = await Promise.all([
    queryContent('/skills').findOne(),
    queryContent('/experience').find(),
    queryContent('/projects').findOne(),
  ])
  return { skills, experience, projects }
})
const links = [
  {
    icon: 'i-carbon-location',
    name: 'Pleven, 5800 Bulgaria',
    href: 'https://www.google.com/maps/place/Pleven/@43.4211722,24.5795139,13z/data=!3m1!4b1!4m6!3m5!1s0x40abf38934b400bb:0x400a01269bf5620!8m2!3d43.4170423!4d24.6066847!16zL20vMDJ2ZmR0',
  },
  {
    icon: 'i-carbon-phone',
    name: '+359 883 487 025',
    href: 'tel:+359883487025',
  },
  {
    icon: 'i-carbon-email',
    name: 'desislav.s.damyanov@gmail.com',
    href: 'mailto:desislav.s.damyanov@gmail.com',
  },
  {
    icon: 'i-fa-brands-linkedin',
    name: '@desislav-damyanov',
    href: 'https://www.linkedin.com/in/desislav-damyanov/',
  },
  {
    icon: 'i-fa-brands-github',
    name: '@desislavsd',
    href: 'https://github.com/desislavsd',
  },
  {
    icon: 'i-fa-brands-npm',
    name: '@desislavsd',
    href: 'https://www.npmjs.com/~desislavsd',
  },
  {
    icon: 'i-fa-brands-stack-overflow',
    name: '@slim',
    href: 'https://stackoverflow.com/users/3629092/slim',
    // classes: ' col-start-2',
  },
]

const education = [
  {
    title: 'Sofia University St. Climent Ohridski',
    degree: `Master's degree, Engineering physics`,
    place: 'Sofia 1000, Bulgaria',
    period: '2015 - 2017',
  },
  {
    title: 'Sofia University St. Climent Ohridski',
    degree: `Bachelor's degree, Physics`,
    place: 'Sofia 1000, Bulgaria',
    period: '2011 - 2015',
  },
  {
    title: '"Geo Milev" High school of Mathematics',
    degree: `High school diploma`,
    place: 'Pleven 5800, Bulgaria',
    period: '2004 - 2011',
  },
]

const themes = [
  'bg-white',
  'bg-[#111] text-white print:bg-white print:text-black',
]

const theme = ref(0)
onMounted(() => (theme.value = globalThis.localStorage?.getItem('theme') || 0))
watch(theme, (val) => globalThis.localStorage?.setItem('theme', val))
</script>
<template>
  <main style="size: A4 portrait" :class="[themes[theme]]">
    <div class="flex">
      <button
        class="print:hidden no-prose absolute top-0 right-0 opacity-30 hover:opacity-100"
        @click="theme ^= 1"
      >
        <i
          :class="['i-carbon-moon', 'i-carbon-sun'][theme]"
          class="text-[20px] m-4"
        ></i>
      </button>
      <header class="flex-1">
        <hgroup>
          <h1 class="text-4xl m-0 leading-normal uppercase">
            Desislav Damyanov
          </h1>
          <h2 class="font-normal mt-0">Senior Frontend Developer</h2>
        </hgroup>
      </header>
      <nav
        class="grid grid-cols-[auto,auto] gap-x-4 justify-between text-sm font-normal"
      >
        <a
          v-for="item in links"
          :href="item.href"
          class="flex items-center gap-2 no-underline hover:underline"
          target="_blank"
          :class="item.classes"
        >
          <span class="flex w-4 justify-center"
            ><span :class="item.icon" class="text-[1.2em] text-center"></span
          ></span>
          {{ item.name }}
        </a>
      </nav>
    </div>
    <!-- <dl class="float-right grid grid-cols-[1.5rem,1fr] items-center text-sm"> -->
    <section>
      <h2 class="section-title">Skills</h2>
      <ContentRenderer :value="data.skills" />
      <h2 class="section-title">Experience</h2>
      <template v-for="item in data.experience">
        <div class="flex items-center text-right mt-3">
          <h3 class="m-0">{{ item.title }}</h3>
          <span class="flex flex-col ml-auto">
            <strong>{{ item.period }} </strong>
          </span>
        </div>
        <div class="flex gap-2">
          <span>{{ item.company }}</span>
          &bull;
          <span class="opacity-50">Sofia 1000, Bulgaria</span>
          &bull;
          <span class="opacity-50">Full-time</span>
          &bull;
          <span class="opacity-50">{{ item.type }}</span>
        </div>
        <ContentRenderer :value="item" />
      </template>
      <!-- <ContentDoc path="/2021" class="" />
      <ContentDoc path="/2018" class="" /> -->

      <h2 class="section-title">Projects</h2>
      <ContentRenderer :value="data.projects" />
      <h2 class="section-title">Education</h2>

      <div v-for="item in education" class="mb-3">
        <div class="flex items-center text-right">
          <h4 class="m-0">{{ item.title }}</h4>
          <span class="flex flex-col ml-auto">
            <strong>{{ item.period }} </strong>
          </span>
        </div>
        <div class="flex gap-2">
          <span>{{ item.degree }}</span>
          &bull;
          <span class="opacity-50">{{ item.place }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
<style>
:root {
  background: #212123;
  font-size: 13px;
}
@media print {
  :root {
    background: none;
  }
}
main {
  @apply relative prose prose-neutral prose-headings:text-inherit prose-a:text-inherit prose-strong:text-inherit leading-6 lg:my-20 w-[227mm] print:w-full print:p-0 print:shadow-none p-[16mm] shadow mx-auto max-w-none;
}
.section-title {
  @apply uppercase text-xs opacity-50 font-light;
}
</style>
