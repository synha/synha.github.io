---
layout: post
title: "Terrain Generation"
description: ""
category: 
comments: True
tags: []
---

I've been working on a 3d terrain generation project for my computer graphics class (CS 334). It's supposed to be ambitious without being impossible, as it's the final project of the class and the supposed culmination of everything we've learned this semester. 

Naturally, it's in the open-ended-pick-your-own-idea style that can be so dangerous and simultaneously so rewarding: pick a project that's over your head, and you'll fall short of your (and the professor's) expectations, your grade will tank, and you'll never find true love. Of course, on the other hand, picking a project that's too easy seems to be a cop-out.

<!--more-->

I'd like to implement perlin noise based procedural terrain generation, but that's pretty straightforward (dare I say "easy") to do. This is a screenshot of where I'm at so far: rendering and manipulating coherent noise, generating a grid of points with appropriate height values, storing said grid in a .obj file, and texture mapping - although my results are a little more pixellated than I'd like.

<a class="fancybox" rel="group" href="/photos/terrain-gen-tex-map.PNG">
<img src="/photos/terrain-gen-tex-map.PNG" alt="" />
</a>


So to add to that, I would like to offer a simple web interface to download map PNGs using the Google Maps API, and then (also using an API), grab elevation data for the relevant latitude / longitude coordinates. Putting this all together, I'd like to render actual pieces of the planet in 3d, using real elevation data, and with satellite imagery texture mapped on top.

So I plan to use the Google Maps API to grab elevation data at various coordinates, and then interpolate for the inbetween points.

I intend on posting again with my results once this project is done, so keep checking back!