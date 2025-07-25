## Realtime gamepoints tracker: Children 'Bodka za prázdninami' game

### 📝 Project description
This project stood out from my previous work because it was born entirely from **my own initiative** - to improve a traditional summer game for children in my village. The core idea of the game is simple: children participate in various activities and, under certain conditions, **earn "money"** - pieces of paper with numbers that represent a value. After some time, a "shop" opens where they can **exchange this play money for back-to-school items**. This game typically takes place during the last week of summer vacation.

So, I said to myself: *'why not digitize it?'* And I got to work.
My goal was to keep things as simple as possible. I didn’t want to build a full backend with a structured database or manage complex server-side rendering (SSR), as I had limited time and also wanted to **handle hosting myself**. That’s why I opted for **Firebase’s Realtime Database** and **ReactJS** on the frontend. This turned out to be the **perfect solution** for this specific use case. Firebase managed real-time data operations (like adding or subtracting points), and React provided an intuitive and responsive user interface.

I **completed** the project **on time** and **successfully** **deployed** it for the actual event. I consulted with the event organizer, and we agreed to run the web app in "test mode" - alongside the traditional paper version as a backup. This turned out to be a **great idea**, as the system wasn’t fully tested yet and I couldn’t be 100% sure about its stability in a live environment.

Event helpers could search for a child and **add points** when they won a game. Likewise, helpers at the shop could search for children and **subtract points** when they spent them. This functionality was only accessible through a **secure admin interface**. Meanwhile, the **public-facing page** displayed **real-time data** such as rankings and current point balances.

#### 🚧 Limitation:
During the “production test,” I realized a major UX flaw: it’s very difficult to find a child's name quickly when there are dozens of children running around and yelling for points! While the system itself worked smoothly and reliably, the usability in a real-life, high-pressure environment needed an improvement.

#### 📌 Future work:
After identifying this bottleneck, I’ve come up with ideas to streamline the process - such as generating **unique QR codes** or assigning **numeric IDs** to each child. This would make **searching** and **processing** much faster, especially when helpers are under pressure.


### 🛠️ Tech stack
- **Frontend:** ReactJS (TypeScript)
- **Databse:** Firebase Realtime Database
- **Hosting:** Firebase Hosting

### 🌱 Skills gained & problems overcomed
- ReactJS
- TypeScript
- Firebase Realtime Database
- Firebase Hosting
- Testing software in a live event
- Quick troubleshooting in a high-energy environment
- Working with real-time data
- Role-based access

### 📊 Preview
The website is accesible at this [link](https://bodkazaprazdninami-16842.web.app/) - feel free to visit the website. To access admin background, there is a static password for preview use, follow this [link](https://bodkazaprazdninami-16842.web.app/admin) and enter password: `hdq4583qrs`
