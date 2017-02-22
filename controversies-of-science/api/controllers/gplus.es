var he = require('he'), // for encoding/decoding special HTML characters
	request = require('request');

import Backend from './backend';

/*	SAMPLE REQUEST:

	http request to grab the content of my most recent G+ posts
	use pageToken query parameter to go to next page (of 20, by default).
	For the last page, pageToken will be absent.

	https://www.googleapis.com/plus/v1/people/108466508041843226480/activities/public
		?key=AIzaSyBGGZNDkHtAVUO-Ug355A3vDp1k8Q7Pe6M

	SAMPLE RESPONSE:

	{
		"kind": "plus#activityFeed",
		"etag": "\"FT7X6cYw9BSnPtIywEFNNGVVdio/5q8_LdY1Sv9-mlBAHUd-BXh3h6k\"",
		"nextPageToken": "Cg0Q2ZKay9WG0QIgACgBEhQIABCwmrv244XRAhj4tLOxgs3QAhgCIBQozLeC4OPFzoP9AQ",
		"title": "Google+ List of Activities for Collection PUBLIC",
		"updated": "2016-12-21T17:36:29.470Z",
		"items": [
			{
				"kind": "plus#activity",
				"etag": "\"FT7X6cYw9BSnPtIywEFNNGVVdio/kfHR3-hp7BcLxpl2JLlzNZNEko4\"",
				"title": "Immanuel Velikovsky: He May be the Most Controversial Person in all of Modern Science / Many People ...",
				"published": "2016-12-21T17:11:36.478Z",
				"updated": "2016-12-21T17:36:29.470Z",
				"id": "z131i1cwwzefzzfef22ce5iges2bgts04",
				"url": "https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Dc5ddhsfU2m",
				"actor": {
					"id": "108466508041843226480",
					"displayName": "Chris Reeve",
					"url": "https://plus.google.com/108466508041843226480",
					"image": {
						"url": "https://lh3.googleusercontent.com/-7pSD5TEGt4g/AAAAAAAAAAI/AAAAAAAAACI/Cqefb4i8T3E/photo.jpg?sz=50"
					},
					"verification": {
						"adHocVerified": "UNKNOWN_VERIFICATION_STATUS"
					}
				},
			"verb": "post",
			"object": {
			"objectType": "note",
			"actor": {
				"verification": {
					"adHocVerified": "UNKNOWN_VERIFICATION_STATUS"
				}
			},
			"content": "\u003cb\u003eImmanuel Velikovsky: He May be the Most Controversial Person in all of Modern Science / Many People Make the Mistake of Focusing Entirely Upon his Extraordinary Claims Rather than his Process and Rationale / There is Just as Much to Learn - About the Scientific Community - from the Reactions and Behaviors of Scientists / Even Carl Sagan, Velikovsky&#39;s Biggest Critic, Realized by the End of it All that this was a Low Point for the Sociology of Science / Since the Story of what Happened is Rarely Told Properly, the Lessons were Never Actually Learned - which is Why You Need to Read this Version\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003eGRAPHIC REFERENCES:\u003cbr /\u003e\u003cbr /\u003e[1] \u003ca href=\"https://swamphermit.wordpress.com/abrahamic-religions/\" class=\"ot-anchor\"\u003ehttps://swamphermit.wordpress.com/abrahamic-religions/\u003c/a\u003e\u003cbr /\u003e\u003cbr /\u003e[2] James P Hogan, \u003ci\u003eKicking the Sacred Cow: Questioning the Unquestionable and Thinking the Impermissible\u003c/i\u003e, at \u003ca href=\"https://books.google.com/books?id=XPms57v-_w0C&amp;pg=PT125&amp;lpg=PT125&amp;dq=venus+greek+newcomer&amp;source=bl&amp;ots=RY7zuDc5t7&amp;sig=CyGlEmxBEA52Thp1yrrVfChkMF4&amp;hl=en&amp;sa=X&amp;ved=0ahUKEwi315uSw4XRAhVS9mMKHRQ2Bzo4ChDoAQgaMAA#v=onepage&amp;q&amp;f=false\" class=\"ot-anchor\"\u003ehttps://books.google.com/books?id=XPms57v-_w0C&amp;pg=PT125&amp;lpg=PT125&amp;dq=venus+greek+newcomer&amp;source=bl&amp;ots=RY7zuDc5t7&amp;sig=CyGlEmxBEA52Thp1yrrVfChkMF4&amp;hl=en&amp;sa=X&amp;ved=0ahUKEwi315uSw4XRAhVS9mMKHRQ2Bzo4ChDoAQgaMAA#v=onepage&amp;q&amp;f=false\u003c/a\u003e\u003cbr /\u003e\u003cbr /\u003e[3] Carl Sagan reflecting, after-the-fact, on the scientific community&#39;s reaction to Velikovsky ...\u003cbr /\u003e\u003cbr /\u003e\u003ca href=\"https://www.youtube.com/watch?v=0MlN7iVIuhk\" class=\"ot-anchor\"\u003ehttps://www.youtube.com/watch?v=0MlN7iVIuhk\u003c/a\u003e\u003cbr /\u003e\u003cbr /\u003e(quote occurs at the very end of the clip)\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003e&quot;The worst aspect of the Velikovsky affair is not that many of his ideas were wrong or silly or in gross contradiction to the facts.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eRather, the worst aspect is that some scientists attempted to suppress Velikovsky&#39;s ideas.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eThe suppression of uncomfortable ideas may be common in religion or in politics, but it is not the path to knowledge. And there&#39;s no place for it in the endeavor of science.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eWe do not know beforehand where fundamental insights will arise from about our mysterious and lovely solar system. And the history of the study of our solar system shows clearly that accepted and conventional ideas are often wrong -- and that fundamental insights can arise from the most unexpected sources.&quot;\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003eFor those who are new to Velikovsky, there exists a widespread tendency to reject everything he has said because it so dramatically diverges from modern scientific theory.\u003cbr /\u003e\u003cbr /\u003eBut, if Velikovsky turns out to be \u003cb\u003eeven partially correct\u003c/b\u003e -- which is an increasingly popular stance today -- then we have a very big problem due to the nature of his discovery:\u003cbr /\u003e\u003cbr /\u003eIf serious catastrophes do indeed extend all the way up to human-historical times, then that suggests that they are wildly more common than the scientific community has understood.  And if the scientific community is wrong on this single point, there is the distinct possibility that something unexpectedly catastrophic may occur in the near future, as in the past ...\u003cbr /\u003e\u003cbr /\u003eIn other words, this is a mistake of such enormous proportions that it could threaten the existence of all of humanity.  For that reason, we&#39;d all be wise to formulate our own personal opinions on this one by following along with his discoveries and subsequent claims.\u003cbr /\u003e\u003cbr /\u003e\u003ca href=\"http://www.bibliotecapleyades.net/ciencia/esp_ciencia_velikovsky14.htm\" class=\"ot-anchor\"\u003ehttp://www.bibliotecapleyades.net/ciencia/esp_ciencia_velikovsky14.htm\u003c/a\u003e\u003cbr /\u003e\u003cbr /\u003eWorlds in Collision: Will the Controversial Theories of Immanuel Velikovsky Be Proven Right?\u003cbr /\u003e\u003cbr /\u003eby Laird Scranton\u003cbr /\u003eNew Dawn Special Issue Vol 6 No 1\u003cbr /\u003e\u003cbr /\u003eOriginally from: \u003ca href=\"http://www.newdawnmagazine.com/articles/worlds-in-collision-will-the-controversial-theories-of-immanuel-velikovsky-be-proven-right\" class=\"ot-anchor\"\u003ehttp://www.newdawnmagazine.com/articles/worlds-in-collision-will-the-controversial-theories-of-immanuel-velikovsky-be-proven-right\u003c/a\u003e\u003cbr /\u003e\u003cbr /\u003eMarch 2, 2012\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003e&quot;Some of the controversies that arise in the world seem to latch on to the public&#39;s imagination and then, for decades or years following, simply will not let go. Such is the character of intrigue that has, for more than sixty years now, swirled turbulently around the personage of Immanuel Velikovsky.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eVelikovsky, who sadly died in 1979, was a Russian-born medical doctor and psychoanalyst.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eHe first came into the public eye in the 1920&#39;s for founding the Scripta Universitatis academic journal in Berlin, \u003c/i\u003e\u003cb\u003e\u003ci\u003eand later worked alongside others to establish the Hebrew University in Jerusalem.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eVelikovsky was an intensely curious man who had been broadly educated in many different fields of study as diverse as science, medicine, philosophy, ancient history and law. He studied psychoanalysis under Sigmund Freud&#39;s acclaimed protégé Wilhelm Stekel.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eVelikovsky first worked alongside Albert Einstein in Berlin, when Einstein edited mathematical articles in Scripta Universitatis, again in Jerusalem during their efforts to help found the Hebrew University, and later in life as close friends and colleagues at Princeton University.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eIn 1939, Velikovsky brought his family to New York City, planning to spend the summer engaged in research at Columbia University&#39;s library. \u003c/i\u003e\u003cb\u003e\u003ci\u003eHe was compiling a psycho-historical text to outline the many intriguing parallels he had uncovered between the Greek literary character Oedipus and the Egyptian Pharaoh Akhnaton.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eThis research, however, was soon sidelined when Velikovsky uncovered an Egyptian papyrus called &#39;The Admonitions of Ipuwer,&#39; a text that seemed to provide historical confirmation for biblical accounts of the 10 plagues in Egypt at the time of Moses. Intrigued that the biblical account might possibly have foundation in actual historic events, Velikovsky began to seek out other ancient references that might serve to uphold that point of view.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eUsing the techniques of a comparative mythologist, Velikovsky began a comprehensive review of ancient texts from around the world dating from that same time period, and produced a body of supporting evidence that was more substantial than he at first imagined.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eThe ancient texts presented what he saw as a kind of universality of theme relating to reports of global calamity\u003c/i\u003e\u003c/b\u003e\u003ci\u003e -- descriptions of,\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e- \u003ci\u003efire raining from the sky\u003c/i\u003e\u003cbr /\u003e- \u003ci\u003eviolent earthquakes\u003c/i\u003e\u003cbr /\u003e- \u003ci\u003evolcanoes erupting\u003c/i\u003e\u003cbr /\u003e- \u003ci\u003edisplacement of great bodies of water,\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003e... and similar disasters of seeming mythic proportion.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eAt the same time he also began a search for references that might point to some real-world agent capable of inflicting the kinds of misfortunes described in the Book of Exodus. He eventually settled on the theoretic close approach of a comet to the Earth as the type of natural event that most closely fits the profile of destructive consequences described in the texts.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eThis tentative conclusion was upheld in his mind by many explicit ancient references to a fearful wandering comet associated with great calamity.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eReferences to this comet were given by different cultures under various names such as Seth and Typhon. \u003c/i\u003e\u003cb\u003e\u003ci\u003eVelikovsky also found himself confused to learn that in some cultures, the names that had been initially assigned to this fearful comet also came later to be associated with the planet Venus.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eMeanwhile, Velikovsky became aware of the sudden rise at about that same historical period of what seemed to be a global obsession with tracking the motions of Venus.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eMany different cultures began to keep careful written counts of the number of days between the risings and settings of Venus. Tracking Venus is the likely motive that is cited by some historians as having inspired the Oracle Bone texts -- the earliest form of written record known to exist in China.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eFor Velikovsky, these facts taken together seemed to implicate Venus as the fearsome agent of terrible events that he believed may have ravaged our planet.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eVelikovsky associated this same period of destruction with,\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e- \u003ci\u003ethe stupendous eruption of the volcano Thera on the island of Santorini\u003c/i\u003e\u003cbr /\u003e- \u003ci\u003ethe sudden fall of the Minoan Empire in the Mediterranean\u003c/i\u003e\u003cbr /\u003e- \u003ci\u003ethe end of the Middle Kingdom in Egypt at around 1500 BCE\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eIn support of this unorthodox thesis, Velikovsky noted that the texts of most ancient cultures prior to 1500 BCE -- most notably those of the Hindus, Babylonians and Egyptians -- refer only to four planets -- Jupiter, Saturn, Mars and Mercury.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eReferences to Venus prior to that date are inexplicably given using words and symbols that were traditionally reserved for comets.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eThey describe Venus as appearing &#39;hairy&#39; or refer to its &#39;horns&#39; or &#39;long tail.&#39; (There are references prior to 1500 BCE to goddesses such as the Sumerian Innana, however, the iconography associated with these goddesses typically involve images of comets.)\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eTwo independent but synchronized sets of ancient astronomic records -- one from China and the other from Korea -- describe the first appearance of a supernova on the same observation date and both compare it in size and brightness to \u003c/i\u003e\u003cb\u003e\u003ci\u003eVenus &#39;with its rays.&#39;\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eFurthermore, virtually all ancient cultures went through a period during which they classified Venus alongside the Sun and the Moon, rather than with the planets, based on its brightness. While it&#39;s true that even now, under proper circumstances, the planet Venus can remain visible during the first hours of daylight, there are ancient reports that refer to the brightness of Venus as rivaling that of the Sun.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eVelikovsky changed the focus of his study from Oedipus to the origins of Venus, and in 1950, MacMillan and Company published his highly controversial book on the subject called Worlds in Collision.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eIn the book Velikovsky postulated -- based on a wide range of ancient accounts and references -- that the planet Venus must have been formed within the historic memory of mankind as a consequence of the impact of a large astronomic body with Jupiter. This event was recorded in a Greek myth in which Jupiter was said to have swallowed whole a pregnant goddess named Metis, soon after which Athena burst newborn from Jupiter&#39;s head.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eAccording to Velikovsky, \u003c/i\u003e\u003cb\u003e\u003ci\u003eVenus -- whose name in Greek means &#39;the newcomer&#39;\u003c/i\u003e\u003c/b\u003e\u003ci\u003e -- at first &#39;blazed as brightly as the Sun&#39; as it roamed across the sky, far outside the Newtonian bounds of its familiar modern-day orbit.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eHe proposed that Venus, in its travels, had wrought considerable havoc within the solar system, that its trajectory had brought it to a near-miss with Earth around 1500 BCE and that Venus had directly impacted Mars.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eThis impact caused Mars, in turn, to leave its orbit and to become the catalyst for a second series of close encounters between Mars and the Earth. The worst of these happened, according to Velikovsky, around 750 BCE.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eOne serious consequence of this final interaction with Mars, according to Velikovsky, is that it affected the Earth&#39;s orbital period, lengthening it from an ancient 360-day year to our familiar 365-day year, and ejecting Mars into its present orbit.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eSeveral factors conspired together to help position Velikovsky&#39;s book to become a top seller.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e- \u003ci\u003eThe first of these was Velikovsky&#39;s own personal reputation and long time association with high-profile projects and people, which together made him a difficult heretic to simply ignore outright, since Velikovsky already had a well-established reputation.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e- \u003ci\u003eThe second was that his theory of an historically recent birth for Venus directly contradicted modern planetary theory and scientific conceptions of proper planetary motion.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e- \u003ci\u003eThe third may have come out of the sheer astonishment on the part of traditional scientists that Velikovsky would presume to offer a theory that crossed the traditional boundaries of numerous academic disciplines, and move outside of his own field of expertise into another field entirely -- namely astronomy -- to make his case.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e- \u003ci\u003eThe fourth was that he deemed it appropriate to cite as evidence for this theory ancient textual references that, in the estimation of many astronomers of the day, rated somewhere alongside a child&#39;s fairy-tale in scientific evidentiary value. Moreover, \u003c/i\u003e\u003cb\u003e\u003ci\u003ethis evidence -- which was drawn from the fields of ancient history and archaeology -- fell far outside of the ability of most astronomers to even attempt to evaluate, let alone refute.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eWith the help of some very effective advance publicity -- including a condensation of the book that appeared in a popular magazine and advance copies of the book that were sent to several leading astronomers -- the outrage of the astronomers was effectively stoked.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eTheir professional outrage helped propel the book to the status of a runaway bestseller.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eThe rising popularity of Velikovsky&#39;s book turned the astronomic world on its head. The din of uproar against the heretic Velikovsky approached levels that had not been heard since the Catholic Church&#39;s infamous persecution of Galileo in the mid-1600&#39;s.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eIn retrospect, the outrage was understandable:\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003e&#39;In what had by 1950 become an increasingly Darwinian world, Velikovsky&#39;s theory threatened to resurrect a kind of fire-and-brimstone religion that the scientific world had struggled for more than a century to supplant.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eLikewise, by contradicting the view that all planets must be billions of years old, Velikovsky&#39;s theory threatened to undermine the Uniformitarian views that provided the foundation for Darwinism itself.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eDarwin&#39;s theory required a stable and unchanging universe to accommodate the imperceptibly slow processes of the evolution it proposed.&#39;\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eSeveral top astronomers wrote to MacMillan&#39;s management urging the company to block publication of Velikovsky&#39;s book.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eDr. Harlow Shapley (then director of the Harvard Observatory) worked behind the scenes to organize colleges and universities in a boycott of MacMillan&#39;s highly profitable textbook division, hoping to financially arm-twist them into dropping the book.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eMacMillan -- hoping to defuse the boycott without actually bowing to the demands of the astronomers -- took the highly unusual step of transferring its lucrative publishing rights for a bestselling book to Doubleday, one of its competitors who had no stake in the sale of textbooks.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eAt the time of publication of Worlds in Collision, many aspects of Velikovsky&#39;s theories were flatly characterized as purest nonsense by authorities within the astronomic world. \u003c/i\u003e\u003cb\u003e\u003ci\u003eLater the truth would surface that some of Velikovsky&#39;s harshest critics had never actually read his book prior to making their declarations, but had instead based their critique solely on pre-publication summaries of the book.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eCertainly Velikovsky&#39;s vision of a young, hot Venus ran counter to the conventional wisdom in 1950, which presumed that Venus had an Earth-like atmosphere and might ultimately prove to be colonizable.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eThe seemingly acrobatic requirements for the motions of Venus laid out by Velikovsky in his book -- moving first like a comet but then somehow eventually coming to inhabit one of the most circular and regular orbits of all the planets -- appeared to flatly contradict Newtonian laws of motion.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eCarl Sagan pointed out that the great amount of energy required to eject a body the size of Venus from Jupiter would likely have vaporized large portions of Jupiter and left those areas intensely hot, even today.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eEven Einstein, whose natural impulse was to be sympathetic to his friend and colleague, at first sided against Velikovsky, flatly discounting his suggestion that electromagnetic forces must play a significant role in planetary dynamics.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eVelikovsky&#39;s theory, when carefully considered, carries with it a number of logical eventualities or consequences that, if they were not all within the reach of scientists to prove or disprove experimentally in 1950, would surely become testable sometime in the near future.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eFor example, a geologically-recent birth for Venus would require the planet to be intensely hot. Likewise, it would imply that Venus exhibit a seemingly unevolved set of geological formations.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eFurthermore, if Venus had roamed the solar system as a rogue astronomic body for centuries then we would expect to find certain anomalies in its orientation and rotation when compared to the other planets.\u003c/i\u003e\u003c/b\u003e\u003ci\u003e Surely we would eventually be able to detect if either Mars of Venus had ever suffered a direct impact with a planet-sized body.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eIf Venus and Mars had made close approaches to the Earth in ancient times, we should be able to identify chemical, geological or magnetic signatures associated with those events.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eMoreover, Velikovsky himself had provided a long list of his own &#39;prognostications&#39; -- consequential observations that he felt must eventually show themselves to be true, if the facts were to uphold what he saw as the unmovable cornerstones of his theory.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eSoon after publication of the book, certain of Velikovsky&#39;s &#39;prognostications&#39; began to be affirmed, if not always for the precise reasons offered by Velikovsky.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eFor example, the controversial outlook Velikovsky held on the role of electromagnetism in the interaction of planetary bodies -- the one that had been at first opposed by Einstein -- was upheld by the incidental discovery of radio emissions from Jupiter and acceptance based on work by Van Allen of the existence of a significant magnetic field surrounding the Earth.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eBy the 1960&#39;s, Velikovsky was considered a credible enough authority on questions of astronomy to be hired by a leading television network to consult and comment during NASA&#39;s live Moon landings.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eIn 1974, a symposium of scientists (including Velikovsky) was held in San Francisco to debate Velikovsky&#39;s theories that ended up pitting several leading critics against Velikovsky. \u003c/i\u003e\u003cb\u003e\u003ci\u003eThe official &#39;spin&#39; coming out of that conference -- and the impression left on the general public -- was that Velikovsky&#39;s theories had been finally and definitively disproved.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eHowever since that time, as new evidence continues to emerge, there has been a persistent nagging tendency for new findings to -- at least outwardly -- appear to uphold many of Velikovsky&#39;s &#39;prognostications.&#39;\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eIn recent years when new discoveries are made that could potentially relate to the controversy, these findings are most often presented without official mention of Velikovsky. Instead, they are typically announced bundled with an accompanying new theory, whose net effect is to distance the find from Velikovsky&#39;s controversial theories.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eFor example, when probes to Venus did, in fact, show the planet to be intensely hot -- a key point that Velikovsky had cited as a crucial demonstration of the correctness of his theory -- scientists completely sidestepped the issue by pre-emptively postulating a runaway greenhouse effect to explain the unexpectedly high temperature.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eWhen Venus was found to have far fewer impact craters than would be expected for a billions-year-old planet, astronomers again proposed that &#39;unknown geologic forces&#39; must have somehow caused a geologically-recent global resurfacing of Venus, thus wiping away evidence of the craters.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eAs far-fetched as some of Velikovsky&#39;s proposals may seem at first blush -- especially his often questionable musings on chemical interactions that he presumes to have occurred between the atmospheres of Venus, Mars and the Earth -- \u003c/i\u003e\u003cb\u003e\u003ci\u003ethere is a perspective from which we might profit by carefully considering certain aspects of his theory.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eFor example, his suggestion that a planet might be formed as a consequence of a large impact on a gas giant planet seems as reasonable as either of the two leading traditional theories of planetary creation -- both of which are believed by some astronomers to suffer from serious (perhaps fatal) theoretic difficulties.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cb\u003e\u003ci\u003eLikewise, it is already an accepted part of traditional astronomic theory that our own Moon was formed as the by-product of an impact. Surely it is not unreasonable to think that what can happen on a small scale in our solar system could also happen on a larger scale.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eSome of Velikovsky&#39;s critics say that it is unreasonable to think that the wandering orbit of Venus as a comet could have circularized for the planet Venus in such a short period -- \u003c/i\u003e\u003cb\u003e\u003ci\u003eand yet it is well known there are some comets that have apparently achieved circular orbits around our Sun.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eSome theories suggest that a comet&#39;s tail can provide the necessary drag to circularize its orbit. Others claim the tidal forces of gravity can cause the orbits to circularize.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eThe way Velikovsky&#39;s argument is structured, there are a number of single-question fail-points attached to his scenario.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eFor example, if it could be definitively shown that granite exists on Venus (a type of rock that takes millions of years to form) then much of Velikovsky&#39;s theory would simply fall to the ground.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eThe same would be true if an archaeologist suddenly turned up an ancient document from prior to 1500 BCE that explicitly referred to Venus as a planet.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eLikewise, if explicit evidence could be produced for the existence of a 365-day year in ancient times, then one of Velikovsky&#39;s key claims would be effectively rebutted.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eMy purpose in writing my newest book The Velikovsky Heresies is to help bring Immanuel Velikovsky and the many still-unanswered questions he raised relating to Venus back into the consciousness of the reading public.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eMy goal is to remind this audience that -- notwithstanding the symposium held in 1974 -- \u003c/i\u003e\u003cb\u003e\u003ci\u003ean open, ongoing controversy still exists relating to Velikovsky. That controversy continues to be colored by the disturbing suggestion of long-term, politically-motivated manipulation of scientific results.\u003c/i\u003e\u003c/b\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eAnother of my main goals is to update the Velikovsky controversy with the latest astronomic evidence relating to Venus, Mars and Jupiter.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eMuch of this new evidence is drawn from the wealth of data gathered by recent probes such as the European Space Agency&#39;s Venus Express, and recent first-hand studies that have been conducted in relation to comets.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eOne of my original hopes -- unfortunately not yet realized -- was to pinpoint a single fact upon which the controversy could be said to turn -- one essential, illusive bit of evidence that a person could point to as unquestionable proof that Velikovsky&#39;s theory must either be largely correct or specifically and fatally flawed.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eInstead, I believe I have brought new eyes and new evidence to bear on many of the critical questions and criticisms that shape the unique and enduring controversy fostered more than sixty years ago by Velikovsky&#39;s Worlds In Collision.\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e\u003ci\u003eLAIRD SCRANTON is an independent software developer from Albany, New York. In addition to The Velikovsky Heresies he has also written a number of books and articles on African and Egyptian cosmology and language, including articles for the University of Chicago&#39;s Anthropology News academic journal and Temple University&#39;s Encyclopedia of African Religion.&quot;\u003c/i\u003e\u003cbr /\u003e\u003cbr /\u003e \u003ca rel=\"nofollow\" class=\"ot-hashtag\" href=\"https://plus.google.com/s/%23catastrophism\"\u003e#catastrophism\u003c/a\u003e     \u003ca rel=\"nofollow\" class=\"ot-hashtag\" href=\"https://plus.google.com/s/%23velikovsky\"\u003e#velikovsky\u003c/a\u003e     \u003ca rel=\"nofollow\" class=\"ot-hashtag\" href=\"https://plus.google.com/s/%23carlsagan\"\u003e#carlsagan\u003c/a\u003e   \ufeff",
			"url": "https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Dc5ddhsfU2m",
			"replies": {
				"totalItems": 8,
				"selfLink": "https://www.googleapis.com/plus/v1/activities/z131i1cwwzefzzfef22ce5iges2bgts04/comments"
			},
			"plusoners": {
				"totalItems": 7,
				"selfLink": "https://www.googleapis.com/plus/v1/activities/z131i1cwwzefzzfef22ce5iges2bgts04/people/plusoners"
			},
			"resharers": {
				"totalItems": 1,
				"selfLink": "https://www.googleapis.com/plus/v1/activities/z131i1cwwzefzzfef22ce5iges2bgts04/people/resharers"
			},
			"attachments": [
				{
					"objectType": "photo",
					"displayName": "Immanuel Velikovsky: He May be the Most Controversial Person in all of Modern Science / Many People Make the Mistake of Focusing Entirely Upon his Extraordinary Claims Rather than his Process and Rationale / There is Just as Much to Learn - About the Scientific Community - from the Reactions and Behaviors of Scientists / Even Carl Sagan, Velikovsky's Biggest Critic, Realized by the End of it All that this was a Low Point for the Sociology of",
					"id": "108466508041843226480.6366602821232329746",
					"content": "immanuel-velikovsky-bbal-card.jpg",
					"url": "https://plus.google.com/photos/108466508041843226480/albums/6366602821253637937/6366602821232329746",
					"image": {
						"url": "https://lh3.googleusercontent.com/-GOgo-Vuvj4s/WFq3iMGNhBI/AAAAAAAAJ1E/28-PK5gbz28QX67j2GQPdkfogoDYkX1wgCJoC/w506-h750/immanuel-velikovsky-bbal-card.jpg",
						"type": "image/jpeg"
					},
					"fullImage": {
						"url": "https://lh3.googleusercontent.com/-GOgo-Vuvj4s/WFq3iMGNhBI/AAAAAAAAJ1E/28-PK5gbz28QX67j2GQPdkfogoDYkX1wgCJoC/w3600-h5040/immanuel-velikovsky-bbal-card.jpg",
						"type": "image/jpeg",
						"height": 5040,
						"width": 3600
					}
				}
			]
		},
		"provider": {
			"title": "Google+"
		},
		"access": {
			"kind": "plus#acl",
			"description": "Public",
			"items": [
				{
					"type": "public"
				}
			]
		}
	}
*/

export default class GPlus {
	constructor() {
		this.userId = '**REMOVED**';
		this.APIKey = '**REMOVED**';

		this.cardCategories = [
			'ongoing',
			'historical',
			'critique',
			'reform',
			'thinking',
			'person'
		];

		// Placeholder static card author
		this.gcardAuthor = {
			userId: 0,
			username: 'Chris Reeve',
			avatar: 'https://lh3.googleusercontent.com/-7pSD5TEGt4g/AAAAAAAAAAI/AAAAAAAAACI/Cqefb4i8T3E/photo.jpg?sz=50',
			email: 'paradigmsareconstructed@gmail.com',
			bio: '(MC) Master of Controversies',
			lastTimeOnline: '1985-04-12T23:20:50.52Z'			
		};
	}

	init() {
		// format as '&pageToken=Cg0Q2ZKay9WG0QIgACgBEhQIABCwmrv244XRAhj4tLOxgs3QAhgCIBQozLeC4OPFzoP9AQ'
		this.nextPageToken = '';
		this.collection = [];
		this.more = true;
		this.titlesAdded = new Set(); // To avoid dupes
	}

	// Assumes that this.nextPageToken has already been updated from prior response
	constructRequest() {
		this.nextRequest = 'https://www.googleapis.com/plus/v1/people/' +
			this.userId +
			'/activities/public?key=' +
			this.APIKey +
			this.nextPageToken;

		console.log('\n' + this.nextRequest);

		return this.nextRequest;
	}

	// Extracts the card summary from the controversy card HTML
	getCardSummary(gcardHTML) {
		// Extract summary from first bolded item in content
		let summaryStart = '<b>',
			summaryEnd = '</b>',
			regExpression = new RegExp('(?:' + summaryStart + ')(.*?)(?:' + summaryEnd + ')');

		let regExResult = regExpression.exec(gcardHTML);

		if (regExResult && regExResult.length > 1) {

			// Check for : between <b></b>, but allow for the possibility that there is no
			// colon separating card title and summary
			let cardSummary = regExResult[1].indexOf(':') === -1 ?
				regExResult[1] :
				regExResult[1].split(': ')[1];

			// Convert any special HTML characters after removing the card title
			return he.decode(cardSummary);
		} else {
			throw "Error generating summary, abort";
		}
	}

	// Determine the category by checking for a hashtag at the end of the card's HTML
	getCategory(gcardHTML) {
		let hashtagIndex = gcardHTML.lastIndexOf('#'),
			hashtagString = gcardHTML.substring(hashtagIndex);

		for (var category of this.cardCategories) {
			if (hashtagString.indexOf(category) !== -1) {
				return category;
			}
		}

		return 'unknown';
	}

	isAnnouncementCard(gcardHTML) {
		return gcardHTML.indexOf('<b>~') === 0;
	}

	hasImageAttachment(gcardObject) {
		return gcardObject['attachments'][0]['fullImage'];
	}

	titleIsSummary(cardTitle) {
		return cardTitle.indexOf(': ') === -1;
	}

	getCardName(cardTitle) {
		return cardTitle.split(':')[0];
	}

	// Saves an individual Google Plus controversy card to GPlus object
	saveCard(gcard) {
		try {
			let gcardObject = gcard['object'],
				gcardHTML = gcardObject['content'];

			let gcardSummary = this.getCardSummary(gcardHTML);

			// If the card HTML begins with a bolded tilde or it has no attachment,
			// then do not add it to the backend
			if (!this.isAnnouncementCard(gcardHTML) &&
				this.hasImageAttachment(gcardObject)) {

				// Controversies of Science controversy cards only have one attached image
				let gcardAttachment = gcardObject['attachments'][0],
					gcardFullImageURL = gcardAttachment['fullImage']['url'],
					gcardThumbnailImageURL = gcardAttachment['image']['url'],
					gcardPublishDate = gcard['published'],
					gcardUpdateDate = gcard['updated'];

				// allow for possibility that there is no colon separating title from summary,
				// in that case title and summary are the same
				let gName = this.titleIsSummary(gcard['title']) ?
					gcardSummary :
					this.getCardName(gcard['title']);

				let category = this.getCategory(gcardHTML);

				console.log('category: ' + category);

				let metaCard = {
					author: this.gcardAuthor,
					name: gName,
					summary: gcardSummary,
					url: gcardFullImageURL,
					thumbnail: gcardThumbnailImageURL,
					publishDate: gcardPublishDate,
					updateDate: gcardUpdateDate,
					category: category
				};

				if (!this.titlesAdded.has(gName)) {
					this.collection.push(metaCard);
					this.titlesAdded.add(gName);
				}

				// Stop at the last card in the Controversies of Science Collection
				if (gName == 'Gerald Pollack') {
					this.more = false;
				}
			}
		} catch(e) {
			return; // Do nothing if the JSON is not the correct format
		}
	}

	// Saves a batch of 20 Google Plus controversy cards to the GPlus object
	saveCards(gcards) {
		for (var gcard of gcards['items']) {
			if (this.more) {
				this.saveCard(gcard);
			}
		}
	}

	// Scrapes a batch of 20 Google Plus controversy cards
	getNextCards(resolve, reject) {
		request(this.constructRequest(), (error, response, body) => {
			if (!error && response.statusCode == 200) {
				let gplusJSON = JSON.parse(body),
					nextPageToken = gplusJSON['nextPageToken'] || null;

				this.saveCards(gplusJSON);

				this.nextPageToken = nextPageToken ?
					'&pageToken=' + nextPageToken :
					null;

				return resolve(this.collection);
			} else {
				return reject(error);
			}
		});
	}

	getNames(collection) {
		return collection.map(card => card['name']);
	}

	// Return only the new cards which should be added to the collection
	calculateNewCardTitles(backendCollection, scrapedCollection) {
		console.log('\nCalculating new card titles ...');

		let backendNames = this.getNames(backendCollection),
			scrapedNames = this.getNames(scrapedCollection);

		return scrapedNames.filter(name => !backendNames.find((name) => {return name;}));
	}

	getCardsByName(collection, cardNames) {
		var newCards = [];

		console.log('\nGetting cards by name ...\n');

		for (var card of collection) {
			let name = card['name'];
			if (cardNames.find((name) => {return name;})) {
				newCards.push(card);
			}
		}

		return newCards;
	}

	// Identifies cards that are not already in the Google Plus card collection, and
	// adds them to the collection
	updateBackend(scrapedCollection, req, res) {
		let backend = new Backend();

		var backendPromise = new Promise(
			(resolve, reject) => {
				backend.getMetaCards(resolve, reject);
			}
		)

		backendPromise.then(
			(backendCollection) => {
				let newCardNames = this.calculateNewCardTitles(backendCollection, scrapedCollection);

				var addtoPromise = new Promise(
					(resolve, reject) => {
						backend.addtoCollection(this.getCardsByName(scrapedCollection, newCardNames),
							resolve, reject);
					}
				);

				addtoPromise.then(
					() => {
						res.json(newCardNames);
					}
				)
				.catch(
					(reason) => {
						console.log('Error updating backend collection with scrape');
						console.log(reason);
					}
				);
			}
		)
		.catch(
			(reason) => {
				console.log('\nBackend Error:');
				console.log(reason);
			}
		);		
	}
}
