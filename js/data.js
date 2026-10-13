// Data: sample comments, sentiment lexicon, negators, intensifiers, topic keywords
const SAMPLE=`The delivery was super fast and the packaging was excellent!
Customer support never replied to my emails. Terrible service.
Great value for the price, I love it.
The app keeps crashing and it is very frustrating.
Product is okay, nothing special.
Support team was helpful and friendly, problem solved in minutes.
Way too expensive for what you get. Disappointed.
Delivery was late and the box arrived damaged.
Amazing quality, works perfectly and looks beautiful.
The app is not easy to use, confusing menus.
Price is fair and the quality is good.
I waited two weeks and nobody helped me. Awful experience.
Really happy with the new update, the app is smooth and fast.
Average product. Arrived on time.
Not bad at all, actually quite impressed with the quality.
The price went up again, very annoying.
Support was slow but eventually fixed the issue.
Best purchase I have made this year, highly recommend!
Poor quality, it broke after one week.
The delivery driver was polite and the parcel arrived early.
Checkout is broken and the app is useless.
Cheap and reliable, I am satisfied.
I hate the new design, it is slow and ugly.
Excellent customer service, they went above and beyond.`;
const L={};
"good:2 great:3 excellent:3 amazing:3 awesome:3 love:3 loved:3 happy:2 fast:1.5 quick:1.5 helpful:2 friendly:2 polite:1.5 perfect:3 beautiful:2.5 smooth:2 reliable:2 impressed:2.5 satisfied:2 recommend:2 best:3 fair:1 cheap:1 value:1.5 easy:1.5 nice:2 solved:2 fixed:1.5 early:1 enjoy:2 wonderful:3 fantastic:3 superb:3 pleased:2 brilliant:3 above:0.5 beyond:0.5 works:1 improved:2 ".split(" ").forEach(x=>{const[a,b]=x.split(":");if(a)L[a]=+b});
"bad:-2 terrible:-3 awful:-3 horrible:-3 hate:-3 poor:-2.5 slow:-1.5 late:-1.5 damaged:-2.5 broken:-2.5 broke:-2.5 crashing:-2.5 crashes:-2.5 useless:-3 frustrating:-2.5 annoying:-2 disappointed:-2.5 disappointing:-2.5 expensive:-1.5 confusing:-2 ugly:-2 rude:-2.5 waited:-1 never:-1 worst:-3 unhappy:-2 problem:-1.5 issue:-1 error:-2 refund:-1 scam:-3 nobody:-1 buggy:-2 failed:-2 worse:-2.5 overpriced:-2.5 complaint:-2 cancel:-1.5".split(" ").forEach(x=>{const[a,b]=x.split(":");L[a]=+b});
const NEG=new Set("not no never n't isn't wasn't don't didn't cannot hardly without nothing".split(" "));
const INT={very:1.5,extremely:1.8,really:1.4,so:1.3,super:1.5,too:1.3,quite:1.2,highly:1.5,slightly:.6,somewhat:.6,bit:.6};
const TOP={Price:/pric|expens|cheap|value|cost|pay/,Support:/support|service|staff|team|help|reply|replied|emails?/,Delivery:/deliver|driver|parcel|box|packag|arriv|shipping/,Quality:/qualit|broke|broken|works|reliable|design|looks|product/,"App & website":/\bapp\b|update|checkout|menu|website|crash/};
