import React from 'react'
import Assignment from '@/components/ProfileNew'
import ProfileNew from '@/components/ProfileNew'

export default function assignment() {
  const DATA = [
    {
      poster : '/inside.jpg'
    , title : "Bo Burnham: Inside"
    , description : "A 2021 musical special written, directed, filmed, edited, and performed by American comedian Bo Burnham. Created alone by Burnham in the guest house of his Los Angeles home during the COVID-19 pandemic, it was released on Netflix on May 30, 2021. Featuring a variety of songs and sketches about his day-to-day life indoors, it depicts Burnham's deteriorating mental health, explores themes of performativity and his relationship to the internet and the audience it helped him reach, and addresses topics such as climate change and social movements. Other segments discuss online activities such as FaceTiming one's mother, posting on Instagram, sexting, and livestreaming video games."
    , type : 'Comedy Special'
    , release : 2021
    , director : 'Bo Burnham'
    },
    {
      poster : '/breaking_bad.jpg'
    , title : 'Breaking Bad'
    , description : "An American crime drama television series created and produced by Vince Gilligan for AMC. Set and filmed in Albuquerque, New Mexico, the series follows Walter White (Bryan Cranston), an underpaid, dispirited high-school chemistry teacher struggling with a recent diagnosis of stage-three lung cancer. White turns to a life of crime and partners with a former student, Jesse Pinkman (Aaron Paul), to produce and distribute methamphetamine to secure his family's financial future before he dies, while navigating the dangers of the criminal underworld. Breaking Bad premiered on AMC on January 20, 2008, and concluded on September 29, 2013, after five seasons consisting of 62 episodes."
    , type : 'TV-Series'
    , release : '2008 - 2013'
    , director : 'Vince Gilligan'
    },
    {
      poster : '/el_camino.jpg'
    , title : 'El Camino: A Breaking Bad Movie'
    , description : "A 2019 American neo-Western crime thriller film. Part of the Breaking Bad franchise, it serves as a sequel and epilogue to the television series Breaking Bad. It continues the story of Jesse Pinkman, who partnered with former teacher Walter White throughout the series to build a crystal meth empire based in Albuquerque. Series creator Vince Gilligan wrote, directed, and produced El Camino; Aaron Paul reprised his role as Jesse Pinkman. Several Breaking Bad actors also reprised their roles, including Jesse Plemons, Krysten Ritter, Charles Baker, Matt Jones, Robert Forster, Jonathan Banks, and Bryan Cranston. Forster died on the day of the film's release, making it one of his final on-screen appearances."
    , type : 'Movie'
    , release : 2019
    , director : 'Vince Gilligan'
    },
    {
        poster : '/better_call_saul.jpg'
      , title : 'Better Call Saul'
      , description : "An American legal crime drama television series created by Vince Gilligan and Peter Gould for AMC. Part of the Breaking Bad franchise, it is a spin-off of Gilligan's previous series, Breaking Bad (2008–2013), to which it serves primarily as a prequel, with some scenes taking place during and after the events of Breaking Bad. Better Call Saul premiered on AMC on February 8, 2015, and ended on August 15, 2022, after six seasons consisting of 63 episodes. Gilligan, who created and developed Breaking Bad, and Gould, who wrote the Breaking Bad episode \"Better Call Saul\", began considering a Saul Goodman spin-off in 2009. Because Saul's role in Breaking Bad had expanded beyond the writing staff's plans, Gilligan felt he could be explored further."
      , type : 'TV-Series'
      , release : '2015 - 2022'
      , director : 'Vince Gilligan & Peter Gould'
    },
  ]

  return (
    <div>
      <center>
      <h1> TV-Series & Movies </h1>
      {DATA.map(item => (
        <ProfileNew poster = {item.poster} title = {item.title}
            description = {item.description} type = {item.type}
            release = {item.release} director = {item.director}/>
      ))}
      </center>
    </div>
  )
}
