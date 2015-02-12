---
layout: post
title: "Simulated Annealer"
description: ""
category:
comments: True 
tags: []
---

This little demo attempts to solve the Traveling Salesman problem for the inputted number of cities. The solution will tend towards the best one as runtime goes to infinity. In practice, this annealer gets good solutions in well under infinite time (although it may take a few runs to converge).

<!--more-->

Instructions: Click "Start!" first.

<div>
	<canvas id="canvas1" width="640" height="480" style="border:1px solid #c3c3c3;">
		Your browser doesn't appear to support the HTML5 <code>&lt;canvas&gt;</code> element.
	</canvas>
	<br>
	

	<table border='0'>

		<tr>
			<td>Number of Cities:</td>
			<td><input id ="citiesBox" type="text"/></td>
			<td>Start Temperature:</td>
			<td><input id ="tempBox" type="text"/></td>
		</tr>
		<tr>
			<td><button onclick="start()">Start!</button></td>
			<td><button onclick="repick()">Select new cities</button></td>
			<td><button onclick="resimulate()">Rerun simulation <br>(same cities)</button></td>
      <!--
			<td><button onclick="displayFinalSolution()">Jump to best solution <br> found so far</button></td>
      -->
		</tr>
		<!-- for alternate cooling schedules
		<tr>
			<td>cooling schedule:</td>
			<td><select id="dropDown" onchange="">
				<option>Linear</option>
				<option>Quadratic</option>
				<option>Logarithmic</option>
				
			</select></td>
		</tr>
		-->
		<tr>
			<td>Temp:</td>
			<td id="p1"></td>
		</tr>
		<tr>
			<td>Current Energy:</td>
			<td id="p2"></td>
		</tr>
		<tr>
			<td>Best Energy:</td>
			<td id="p3"></td>
			<!--
			<td>progress:</td>
			<td id="p4"></td>
			-->
		</tr>
	</table>
	
	
	<script src="/js/simulated_anneal.js" type="text/javascript">start();</script>

</div>

The idea of temperature here draws from the analogy that we're cooling a dynamic particle system (liquid metal for instance) and as the system crystallizes, the particles fall into their optimal - ie, lowest energy - states.

Keeping track of the overall lowest energy state for a given system of cities is a metaheuristic technically outside a 'pure' simulated annealer, since in a particle system a given particle has no way to save its state. It's easy in software though, so the rightmost button will move the system to reflect the lowest energy state found so far.

If you're having trouble getting a system to converge to something that looks like the lowest energy state, one technique that works is running the annealer a few times starting from temp = 100 (jumping to the best solution found after each run), and then decreasing the temperature to something lower, like 50, and running it a few more times (again, jumping to the best solution at the end of each run).

--

I just finished taking a CS class called Numerical Methods. We covered various (numerical) methods to solve equations, systems of linear/nonlinear/differential equations, optimization, curve fitting, splines, and simulated annealing.

I'd like to add support for different cooling schedules, the one used in the simulation right now is a simple linear decrease in temperature.
