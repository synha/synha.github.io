---
layout: post
title: "Cube, the chat bot"
description: ""
category: 
comments: True
tags: []
---

My most recent project (besides surviving the 2013 Summer of Math) has been writing a chat bot for the room my friends and I hang out in. It's called Cube, and is written in python (using sleekxmpp).

Cube is a markov chain, pseudo-random text generating bot who can say some pretty ridiculous things.

A markov chain takes input text - in this case, directly from our human speech in the chat room - and 'slices' it up into key-value pairs, where the key is a 2-word tuple, and points to a single word value. Cube appends END tokens so we know where to start and stop generating, and stores the resulting python dict.

For example if someone were to say "The quick brown fox", it would become:
	
	END the -> quick
	the quick -> brown
	quick brown -> fox
	brown fox -> END

<!--more-->

Over time, there's overlap in our speech, and these are added to the dict. For instance, if someone were to then say "The quick brown cow", our updated dict would have

	END the -> quick
	the quick -> brown
	quick brown -> {fox, cow}
	brown fox -> END
	brown cow -> END

When prompted to generate a sentence, we starts a markov chain with a random key where the first token is END, and follow it until we encounter another END token, two words at a time. If there are multiple values for a given key tuple, we choose at random. Each new word is appended to the list of words that will comprise our bot-generated text.

It's worth mentioning at this point that the probability of a given next word is stored to the dict as well. For instance if we had "I am fat", "I am fat", and "I am hungry", the values stored would be:
	
	I am -> {fat, fat, hungry}

So there would be a 66% chance of selecting "fat", and a 33% chance of selecting hungry.

That's the basic idea behind markov chains. Cube however, does this slightly differently.

When a new sentence is input, Cube actually saves *two* markov chains. One forwards (like we've covered), and one in reverse. So the sentence "the quick brown fox" becomes the forward dict from above, as well as:

	END fox -> brown
	fox brown -> quick
	brown quick -> the
	quick the -> END

These two markov chains, forward and reverse, are stored in two separate dicts, which makes this whole model a little trickier to visualize, but bear with me. Now, when we go to generate a sentence, we can start from any word in the corpus and run a markov chain in *both* directions, until each reaches an END token.  This allows for much greater variance in generated text, because there are obviously many more words in the corpus than there are words-preceded-by-END-tokens.

Over time, Cube starts to say some very interesting things indeed.

	viraj: cube
	cube: the agent started taking out his badge and had anyone used the criticisms box to agree with your fingers