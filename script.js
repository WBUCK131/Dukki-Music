/* =========================================================
   [1] 데이터 & 기본 전역 변수
   ========================================================= */
let historyStack = []; // 방문 기록 저장

// [NEW] 최신 발매 앨범 ID 목록 설정 (여기에 원하는 앨범 ID를 적으세요)
const NEW_RELEASE_IDS = [1015, 3001, 6001, 1001, 5001]; 


// [NEW] 타이틀 곡 목록 정의
const TITLE_TRACKS = [
    "고준명 노크", "사랑하오랑캐", "두끼님에게 전하는 사랑의 노래", 
    "Dream Alarm", "No Reset", "고준명 뭐야", "밤하늘의 별은 저리도 빛나는데", // *데이터에 맞게 '별은'으로 수정됨
    "상전 미오기 납시오", "불 꺼진 놀이공원", "두근, 자동응답", "네 번째 하늘", 
    "Puki Puki Love Me Do!", "Love인가 봐!", "Sugar Rush", 
    "하늘에서 내려온 두끼가 하는 말", "침입자(intrude)", "휴!(休!)", 
    "정형주 헌정곡", "Who am I?", 
    "대구의 차은우 두끼", "American Dream", "여름밤", "REBEL", "Visionary", 
    "Emissary", "Colour!", "DayDream", "Great World", "Zero Hour", 
    "고명나라 공주", "이룸코어", "No Chains", "이대남", "Bubble", "JRA", 
    "성장기", "이뤄주고 싶은 겨울", "우리의 도서관은 도요히츠로 변했다", 
    "김혜옥의 원칙", "비이상적인 취향", "FXXK 수능", "소녀의 우주", 
    "Dream of Freedom", "펼쳐질 너의 미래", "Chéri Bomb", "안녕, 여름!", 
    "대구의 차은우 두끼 (2025)", "Lalala", "God Field 매드무비", 
    "쑤캐아 냉장고 처먹어", "쑤캐아는 농약을 좋아해", "두끼즈 VS 냥냥즈", 
    "12거는 식품영양학자", "21세기에 일어난 러다이트 운동", 
    "신미영의 끝나지 않는 줌 회의실", "비품실에서 피어난 기계", 
    "ND(너에게 당신)", "Love Rush", "별빛 속의 스테이지", "말해줘", 
    "Sparking Endlessly", "SDT (Speed Up)", "사왓디 사랑", "Soft", "Poppin’ Love"
];
// [NEW] 재생 금지 곡 목록 (데이터의 띄어쓰기 반영)
const BANNED_TRACKS = [
    "비밀 속으로(intro)", 
    "질서의 주인장", 
    "침입자(intrude)", 
    "그 기억 속에 사라지지 않는 우리의 아름다운 날들", 
    "그럼에도", 
    "SMS(Outro)", 
    "전하지 못한 부품 (Outro)", 
    "친구", 
    "두끼즈 VS 냥냥즈", 
    "아담의 영원한 컴퓨터실", 
    "친구 (Outro)"
];

const data = {
    artists: [
        { id: 1, name: "멍멍멍멍멍미친개", img: "DukkiArtistimage/10.png" },
        { id: 2, name: "글로웅", img: "DukkiArtistimage/6.png" },
        { id: 3, name: "김자반", img: "DukkiArtistimage/2.png" },
        { id: 4, name: "우주소녀", img: "DukkiArtistimage/3.png" },
        { id: 5, name: "MELTIE", img: "DukkiArtistimage/7.png" },
        { id: 6, name: "쑤캐아", img: "DukkiArtistimage/5.png" },
        { id: 7, name: "니차욘따라락", img: "DukkiArtistimage/12.png" },
        { id: 8, name: "포지셔닝", img: "DukkiArtistimage/11.png" },
        { id: 9, name: "컹콴", img: "DukkiArtistimage/1.png" }
    ],
    albums: [
    { id: 1015, artistId: 1, title: "Still Falling", type: "EP", cover: "Dukkiimage/55.png", songs: [{ title: "겨울의 예감", duration: "2:57", file: "Dukkimusic/겨울의 예감.mp3" }, { title: "Poppin’ Love", duration: "3:03", file: "Dukkimusic/Poppin’ Love.mp3" }, { title: "Winter Snow Story", duration: "3:24", file: "Dukkimusic/Winter Snow Story.mp3" }, { title: "작은 약속의 멜로디", duration: "2:57", file: "Dukkimusic/작은 약속의 멜로디.mp3" }, { title: "Poppin’ Love (Sped Up)", duration: "2:17", file: "Dukkimusic/Poppin’ Love (Sped Up).mp3" }] },
        {
            id: 1001, artistId: 1, title: "Dukki Universe Final Chapter", type: "Album",
            cover: "Dukkiimage/2.jpg",
            songs: [
                { title: "두끼님에게 전하는 사랑의 노래 2.0", duration: "3:30", file: "Dukkimusic/두끼님에게 전하는 사랑의 노래 2.0.mp3" },
                { title: "고준명 노크", duration: "3:10", file: "Dukkimusic/고준명 노크.mp3" },
                { title: "달려라 두끼", duration: "2:55", file: "Dukkimusic/달려라 두끼.mp3" },
                { title: "Heartline Overdrive", duration: "3:40", file: "Dukkimusic/Heartline Overdrive.mp3" },
                { title: "사랑하오랑캐", duration: "3:15", file: "Dukkimusic/사랑하오랑캐.mp3" },
                { title: "Ready for Love", duration: "3:20", file: "Dukkimusic/Ready for Love.mp3" },
                { title: "씨다래안끄레보내마의 노래", duration: "3:05", file: "Dukkimusic/씨다래안끄레보내마의 노래.mp3" },
                { title: "고준명 뭐노 (Special Edition)", duration: "3:00", file: "Dukkimusic/고준명 뭐노 (Special Edition).mp3" },
                { title: "두근두근 수동응답", duration: "3:12", file: "Dukkimusic/두근두근 수동응답.mp3" },
                { title: "Sayonara Recipe", duration: "3:45", file: "Dukkimusic/Sayonara Recipe.mp3" },
                { title: "À Travers Toi", duration: "3:33", file: "Dukkimusic/À Travers Toi.mp3" },
                { title: "声にならない朝を抱いて", duration: "4:01", file: "Dukkimusic/声にならない朝を抱いて.mp3" },
                { title: "Crystal Heart Syndrome", duration: "3:25", file: "Dukkimusic/Crystal Heart Syndrome.mp3" },
                { title: "안녕, 조심히 가", duration: "3:50", file: "Dukkimusic/안녕, 조심히 가.mp3" },
                { title: "두끼님에게 전하지 못한 사랑의 노래", duration: "4:10", file: "Dukkimusic/두끼님에게 전하지 못한 사랑의 노래.mp3" }
            ]
        },
        
        { id: 1002, artistId: 1, title: "The Second Story: Dream Reset", type: "Album", cover: "Dukkiimage/7.jpg", songs: [{ title: "반짝이는 건, 너니까!", duration: "3:22", file: "Dukkimusic/반짝이는 건, 너니까!.mp3" }, { title: "Dream Alarm", duration: "3:15", file: "Dukkimusic/Dream Alarm.mp3" }, { title: "Dancing Queen", duration: "3:08", file: "Dukkimusic/Dancing Queen.mp3" }, { title: "Kick Kick That (킥킥대)", duration: "2:50", file: "Dukkimusic/Kick Kick That (킥킥대).mp3" }, { title: "사랑은 체리맛 립글로스", duration: "3:10", file: "Dukkimusic/사랑은 체리맛 립글로스.mp3" }, { title: "예쁘다고 다가오지 마 (Don't Call Me Pretty)", duration: "3:05", file: "Dukkimusic/예쁘다고 다가오지 마 (Don't Call Me Pretty).mp3" }, { title: "No Reset", duration: "3:30", file: "Dukkimusic/No Reset.mp3" }, { title: "분홍빛 거짓말쟁이", duration: "3:12", file: "Dukkimusic/분홍빛 거짓말쟁이.mp3" }, { title: "강제졸업하겠습니다!", duration: "3:00", file: "Dukkimusic/강제졸업하겠습니다!.mp3" }, { title: "수채화 같은 약속", duration: "3:40", file: "Dukkimusic/수채화 같은 약속.mp3" }] },
        { id: 1003, artistId: 1, title: "고준명 뭐야", type: "Single", cover: "Dukkiimage/9.jpg", songs: [{ title: "고준명 뭐야", duration: "3:00", file: "Dukkimusic/고준명 뭐야.mp3" }, { title: "고준명썸머!", duration: "2:55", file: "Dukkimusic/고준명썸머!.mp3" }] },
        { id: 1004, artistId: 1, title: "조상모사", type: "Single", cover: "Dukkiimage/36.jpg", songs: [{ title: "밤하늘의 별은 저리도 빛나는데", duration: "4:15", file: "Dukkimusic/밤하늘의 별은 저리도 빛나는데.mp3" }] },
        { id: 1005, artistId: 1, title: "상전 미오기 납시오", type: "EP", cover: "Dukkiimage/40.jpg", songs: [{ title: "상전 미오기 납시오", duration: "3:10", file: "Dukkimusic/상전 미오기 납시오.mp3" }, { title: "상전 미오기 납시오 (Ver.2)", duration: "3:15", file: "Dukkimusic/상전 미오기 납시오 (Ver.2).mp3" }, { title: "상전 미오기 납시오 (Sped Up)", duration: "2:40", file: "Dukkimusic/상전 미오기 납시오 (Sped Up).mp3" }] },
        { id: 1006, artistId: 1, title: "Still Spinning", type: "EP", cover: "Dukkiimage/37.jpg", songs: [{ title: "꿈과 미래의 에필로그 (Intro)", duration: "1:45", file: "Dukkimusic/꿈과 미래의 에필로그 (Intro).mp3" }, { title: "불 꺼진 놀이공원", duration: "3:20", file: "Dukkimusic/불 꺼진 놀이공원.mp3" }, { title: "아담과 나의 별", duration: "3:30", file: "Dukkimusic/아담과 나의 별.mp3" }, { title: "빌려진 고양쓰", duration: "3:05", file: "Dukkimusic/빌려진 고양쓰.mp3" }, { title: "두현이의 옥상", duration: "3:10", file: "Dukkimusic/두현이의 옥상.mp3" }, { title: "이름 없이 남은 자", duration: "3:40", file: "Dukkimusic/이름 없이 남은 자.mp3" }, { title: "멍멍멍멍멍미친개 (Outro)", duration: "2:00", file: "Dukkimusic/멍멍멍멍멍미친개 (Outro).mp3" }] },
        { id: 1007, artistId: 1, title: "Dukki Universe Chapter 4", type: "EP", cover: "Dukkiimage/41.jpg", songs: [{ title: "CPR", duration: "3:00", file: "Dukkimusic/CPR.mp3" }, { title: "두근, 자동응답", duration: "3:15", file: "Dukkimusic/두근, 자동응답.mp3" }, { title: "Peachy Mood!", duration: "3:20", file: "Dukkimusic/Peachy Mood!.mp3" }, { title: "네 번째 하늘", duration: "3:30", file: "Dukkimusic/네 번째 하늘.mp3" }, { title: "우리 마을에 왜 왔니?", duration: "2:55", file: "Dukkimusic/우리 마을에 왜 왔니.mp3" }, { title: "Puki Puki Love Me Do!", duration: "3:05", file: "Dukkimusic/Puki Puki Love Me Do!.mp3" }, { title: "Faded Dream (feat.Jude Hale)", duration: "3:40", file: "Dukkimusic/Faded Dream.mp3" }] },
        { id: 1008, artistId: 1, title: "Love인가 봐!", type: "Single", cover: "Dukkiimage/42.jpg", songs: [{ title: "Love인가 봐!", duration: "3:10", file: "Dukkimusic/Love인가 봐!.mp3" }, { title: "Love인가 봐! (Sped Up)", duration: "2:40", file: "Dukkimusic/Love인가 봐! (Sped Up).mp3" }] },
        { id: 1009, artistId: 1, title: "Dukki Universe Chapter 3", type: "EP", cover: "Dukkiimage/23.png", songs: [{ title: "Echo", duration: "3:05", file: "Dukkimusic/Echo.mp3" }, { title: "Sugar Rush", duration: "2:55", file: "Dukkimusic/Sugar Rush.mp3" }, { title: "Flash!", duration: "3:00", file: "Dukkimusic/Flash!.mp3" }, { title: "어이없어! (Seriously?)", duration: "3:10", file: "Dukkimusic/어이없어! (Seriously).mp3" }, { title: "생떼부리기", duration: "2:50", file: "Dukkimusic/생떼부리기.mp3" }, { title: "Sugar Rush (Sped Up)", duration: "2:30", file: "Dukkimusic/슈가러쉬스피드.mp3" }] },
        { id: 1010, artistId: 1, title: "Dukki Universe Chapter 2", type: "EP", cover: "Dukkiimage/21.png", songs: [{ title: "두끼를 따라", duration: "3:12", file: "Dukkimusic/두끼를 따라.mp3" }, { title: "하늘에서 내려온 두끼가 하는 말", duration: "3:20", file: "Dukkimusic/하늘에서 내려온 두끼가 하는 말.mp3" }, { title: "유레카! 두끼", duration: "3:05", file: "Dukkimusic/유레카! 두끼.mp3" }, { title: "형, 달아올라요. (Dukki is CO2)", duration: "3:30", file: "Dukkimusic/형, 달아올라요.mp3" }, { title: "두끼를 향한 사랑의 세레나데", duration: "3:40", file: "Dukkimusic/두끼를 향한 세레나데.mp3" }] },
        { id: 1011, artistId: 1, title: "조삼모사 (H.P) 2.0", type: "EP", cover: "Dukkiimage/28.jpg", songs: [{ title: "비밀 속으로(intro)", duration: "1:50", file: "Dukkimusic/비밀 속으로(intro).mp3" }, { title: "질서의 주인장", duration: "3:15", file: "Dukkimusic/질서의 주인장.mp3" }, { title: "침입자(intrude)", duration: "3:20", file: "Dukkimusic/침입자(intrude).mp3" }, { title: "그 기억 속에 사라지지 않는 우리의 아름다운 날들", duration: "3:50", file: "Dukkimusic/그 기억 속에 사라지지 않는 우리의 아름다운 날들.mp3" }, { title: "그럼에도", duration: "3:30", file: "Dukkimusic/그럼에도.mp3" }, { title: "휴!(休!)", duration: "3:10", file: "Dukkimusic/휴!.mp3" }, { title: "SMS(Outro)", duration: "1:30", file: "Dukkimusic/SMS(Outro).mp3" }] },
        { id: 1012, artistId: 1, title: "정형주 헌정곡", type: "Single", cover: "Dukkiimage/18.png", songs: [{ title: "정형주 헌정곡", duration: "3:33", file: "Dukkimusic/정형주 헌정곡.mp3" }] },
        { id: 1013, artistId: 1, title: "Who am I?", type: "Single", cover: "Dukkiimage/17.png", songs: [{ title: "Who am I?", duration: "3:45", file: "Dukkimusic/Who am I.mp3" }] },
        { id: 1014, artistId: 1, title: "Dukki Universe", type: "EP", cover: "Dukkiimage/26.png", songs: [{ title: "대구의 차은우 두끼", duration: "3:05", file: "Dukkimusic/Among.mp3" }, { title: "두끼의 행복", duration: "3:10", file: "Dukkimusic/Eatsong.mp3" }, { title: "내 두끼님", duration: "3:20", file: "Dukkimusic/내 두끼님.mp3" }, { title: "두끼님에게 전하는 사랑의 노래", duration: "3:30", file: "Dukkimusic/Lovesong.mp3" }] },
        { id: 2001, artistId: 2, title: "Glowz Expectations", type: "EP", cover: "Dukkiimage/5.jpg", songs: [{ title: "Colour!", duration: "3:10", file: "Dukkimusic/Colour!.mp3" }, { title: "DayDream", duration: "3:05", file: "Dukkimusic/DayDream.mp3" }, { title: "Youth", duration: "3:20", file: "Dukkimusic/Youth.mp3" }, { title: "Very very", duration: "2:55", file: "Dukkimusic/Very very.mp3" }, { title: "존재이면(存在面)", duration: "3:30", file: "Dukkimusic/존재이면(存在面).mp3" }, { title: "Lovely Winner", duration: "3:15", file: "Dukkimusic/Lovely Winner.mp3" }] },
        { id: 2002, artistId: 2, title: "GLOWZ BRAVE NEW WORLD", type: "EP", cover: "Dukkiimage/6.png", songs: [{ title: "가장 높이 오를 때", duration: "2:53", file: "Dukkimusic/가장 높이 오를 때.mp3" }, { title: "Great World", duration: "2:29", file: "Dukkimusic/Great World.mp3" }, { title: "Stay On", duration: "3:27", file: "Dukkimusic/Stay On.mp3" }, { title: "Zero Hour", duration: "3:27", file: "Dukkimusic/Zero Hour.mp3" }, { title: "세상은 변해", duration: "3:03", file: "Dukkimusic/세상은 변해.mp3" }] },
        { id: 2003, artistId: 2, title: "A Midsummer Glowz Dream", type: "Album", cover: "Dukkiimage/35.jpg", songs: [{ title: "American Dream", duration: "3:25", file: "Dukkimusic/American Dream.mp3" }, { title: "Bottle Pop!", duration: "3:10", file: "Dukkimusic/Bottle Pop!.mp3" }, { title: "Still alive", duration: "3:05", file: "Dukkimusic/Still alive.mp3" }, { title: "Let us Go until You Go", duration: "3:40", file: "Dukkimusic/Let us Go until You Go.mp3" }, { title: "여름밤", duration: "3:30", file: "Dukkimusic/여름밤.mp3" }, { title: "내 맘 한켠", duration: "3:15", file: "Dukkimusic/내 맘 한켠.mp3" }, { title: "이름 없이 남은 자", duration: "3:20", file: "Dukkimusic/이름 없이 남은 자.mp3" }, { title: "고명나라 공주 (Pool Party Ver) 글로웅", duration: "3:12", file: "Dukkimusic/고명나라 공주 (Pool Party Ver) 글로웅.mp3" }, { title: "Emmissary (Midnight Ver)", duration: "3:45", file: "Dukkimusic/Emmissary (Midnight Ver).mp3" }] },
        { id: 2004, artistId: 2, title: "Glowz Empathy", type: "EP", cover: "Dukkiimage/43.jpg", songs: [{ title: "Day after day", duration: "3:00", file: "Dukkimusic/Day after day.mp3" }, { title: "고명나라 공주", duration: "3:12", file: "Dukkimusic/고명나라 공주.mp3" }, { title: "이룸코어", duration: "2:50", file: "Dukkimusic/이룸코어.mp3" }, { title: "자각몽", duration: "3:05", file: "Dukkimusic/자각몽.mp3" }, { title: "No Chains", duration: "3:15", file: "Dukkimusic/No Chains.mp3" }, { title: "오늘도 달린 너에게", duration: "3:30", file: "Dukkimusic/오늘도 달린 너에게.mp3" }] },
        { id: 2005, artistId: 2, title: "TFT", type: "Album", cover: "Dukkiimage/33.jpg", songs: [{ title: "REBEL", duration: "3:10", file: "Dukkimusic/REBEL.mp3" }, { title: "Visionary", duration: "3:20", file: "Dukkimusic/Visionary.mp3" }, { title: "Sailing Love", duration: "3:15", file: "Dukkimusic/Sailing Love.mp3" }, { title: "Black Rose", duration: "3:00", file: "Dukkimusic/Black Rose.mp3" }, { title: "Emissary", duration: "3:30", file: "Dukkimusic/Emissary.mp3" }, { title: "Star Guardian", duration: "3:25", file: "Dukkimusic/Star Guardian.mp3" }, { title: "Sailing Love (Sped Up)", duration: "2:50", file: "Dukkimusic/Sailing Love (Sped Up).mp3" }] },
        { id: 2006, artistId: 2, title: "미수반 (Special)", type: "EP", cover: "Dukkiimage/32.jpg", songs: [{ title: "My World", duration: "3:10", file: "Dukkimusic/My World.mp3" }, { title: "이대남", duration: "3:00", file: "Dukkimusic/이대남.mp3" }, { title: "눈작남", duration: "2:55", file: "Dukkimusic/눈작남.mp3" }, { title: "김혜옥의 조기퇴근", duration: "3:20", file: "Dukkimusic/김혜옥의 조기퇴근.mp3" }, { title: "Strategy", duration: "3:15", file: "Dukkimusic/Strategy.mp3" }, { title: "비이상적인 취향 pt.2", duration: "3:05", file: "Dukkimusic/비이상적인 취향 pt.2.mp3" }] },
        { id: 2007, artistId: 2, title: "Bubble", type: "Single", cover: "Dukkiimage/31.jpg", songs: [{ title: "Bubble", duration: "3:00", file: "Dukkimusic/Bubble.mp3" }] },
        { id: 2008, artistId: 2, title: "JRA", type: "Single", cover: "Dukkiimage/45.jpg", songs: [{ title: "JRA", duration: "3:10", file: "Dukkimusic/JRA.mp3" }] },
        { id: 2009, artistId: 2, title: "어느 자매의 이야기", type: "Single", cover: "Dukkiimage/44.jpg", songs: [{ title: "never grow up", duration: "3:15", file: "Dukkimusic/never grow up.mp3" }, { title: "성장기", duration: "3:00", file: "Dukkimusic/성장기.mp3" }, { title: "철의 아이", duration: "3:10", file: "Dukkimusic/철의 아이.mp3" }, { title: "철의 아이(sped up)", duration: "2:40", file: "Dukkimusic/철의 아이(sped up).mp3" }, { title: "기계일지 글로웅", duration: "3:20", file: "Dukkimusic/기계일지 글로웅.mp3" }, { title: "자매를 갈라놓은 세상", duration: "3:30", file: "Dukkimusic/자매를 갈라놓은 세상.mp3" }, { title: "자석처럼 날 끌어줘(You gotta)", duration: "3:05", file: "Dukkimusic/자석처럼 날 끌어줘(You gotta).mp3" }, { title: "슬픈 자매의 이야기", duration: "3:40", file: "Dukkimusic/슬픈 자매의 이야기.mp3" }] },
        { id: 2010, artistId: 2, title: "이뤄주고 싶은 겨울", type: "Single", cover: "Dukkiimage/29.jpg", songs: [{ title: "이뤄주고 싶은 겨울", duration: "3:30", file: "Dukkimusic/이뤄주고 싶은 겨울.mp3" }] },
        { id: 2011, artistId: 2, title: "Our library Our live of read", type: "EP", cover: "Dukkiimage/30.jpg", songs: [{ title: "도요히츠&(And)", duration: "3:00", file: "Dukkimusic/도요히츠&(And).mp3" }, { title: "우리의 도서관은 도요히츠로 변했다", duration: "3:20", file: "Dukkimusic/우리의 도서관은 도요히츠로 변했다.mp3" }, { title: "김혜옥의 원칙", duration: "3:10", file: "Dukkimusic/김혜옥의 원칙.mp3" }, { title: "Super atrractive!", duration: "2:55", file: "Dukkimusic/Super atrractive!.mp3" }, { title: "Super atrractive! (Speed Up)", duration: "2:30", file: "Dukkimusic/Super atrractive! (Speed Up).mp3" }, { title: "그리워하는 이유", duration: "3:15", file: "Dukkimusic/그리워하는 이유.mp3" }] },
        { id: 2012, artistId: 2, title: "OK ORIANNA", type: "EP", cover: "Dukkiimage/24.jpg", songs: [{ title: "비이상적인 취향", duration: "3:10", file: "Dukkimusic/비이상적인 취향.mp3" }, { title: "오리아나, 우리하나", duration: "3:00", file: "Dukkimusic/오리아나, 우리하나.mp3" }, { title: "제단에서 너를 행복하게 할 수 있다면", duration: "3:30", file: "Dukkimusic/제단에서 너를 행복하게 할 수 있다면.mp3" }] },
        { id: 8001, artistId: 8, title: "Soft", type: "Single", cover: "Dukkiimage/47.png", songs: [{ title: "Soft", duration: "3:20", file: "Dukkimusic/Soft.mp3" }] },
        { id: 8002, artistId: 8, title: "Love Rush", type: "Single", cover: "Dukkiimage/14.png", songs: [{ title: "Love Rush", duration: "3:20", file: "Dukkimusic/Love Rush.mp3" }, { title: "Love Rush (Speed Up)", duration: "2:50", file: "Dukkimusic/Love Rush (Speed Up).mp3" }] },
        { id: 8003, artistId: 8, title: "New Game Start", type: "EP", cover: "Dukkiimage/15.png", songs: [{ title: "별빛 속의 스테이지", duration: "3:15", file: "Dukkimusic/별빛 속의 스테이지.mp3" }, { title: "Cherish", duration: "3:10", file: "Dukkimusic/Cherish.mp3" }] },
        { id: 8004, artistId: 8, title: "말해줘", type: "Single", cover: "Dukkiimage/12.png", songs: [{ title: "말해줘", duration: "3:05", file: "Dukkimusic/말해줘.mp3" }] },
        { id: 8005, artistId: 8, title: "The End Of Two Meals", type: "EP", cover: "Dukkiimage/13.png", songs: [{ title: "Step by Step", duration: "3:10", file: "Dukkimusic/Step by Step.mp3" }, { title: "Sparking Endlessly", duration: "3:20", file: "Dukkimusic/Sparking Endlessly.mp3" }] },
        { id: 8006, artistId: 8, title: "SDT (Speed Up)", type: "Single", cover: "Dukkiimage/11.png", songs: [{ title: "SDT (Speed Up)", duration: "3:00", file: "Dukkimusic/SDT (Speed Up).mp3" }] },
        { id: 7004, artistId: 7, title: "Hopes", type: "Album", cover: "Dukkiimage/38.jpg", songs: [{ title: "두끼즈 VS 냥냥즈", duration: "3:10", file: "Dukkimusic/두끼즈 VS 냥냥즈.mp3" }, { title: "아담의 영원한 컴퓨터실", duration: "3:05", file: "Dukkimusic/아담의 영원한 컴퓨터실.mp3" }, { title: "Editor is really real (clean ver)", duration: "3:20", file: "Dukkimusic/Editor is really real (clean ver).mp3" }, { title: "친구 (Outro)", duration: "2:55", file: "Dukkimusic/친구 (Outro).mp3" }] },
        { id: 7003, artistId: 7, title: "12거는 식품영양학자", type: "Single", cover: "Dukkiimage/25.jpg", songs: [{ title: "12거는 식품영양학자", duration: "3:00", file: "Dukkimusic/12거는 식품영양학자.mp3" }] },
        { id: 7002, artistId: 7, title: "21세기에 일어난 러다이트 운동", type: "EP", cover: "Dukkiimage/46.jpg", songs: [{ title: "21세기에 일어난 러다이트 운동", duration: "3:15", file: "Dukkimusic/21세기에 일어난 러다이트 운동.mp3" }, { title: "기계 공포증 (since 염사모 회식)", duration: "3:00", file: "Dukkimusic/기계 공포증 (since 염사모 회식).mp3" }, { title: "오리아나의 역설 (Beep-bap)", duration: "3:10", file: "Dukkimusic/오리아나의 역설 (Beep-bap).mp3" }, { title: "lucky robot syndrome", duration: "3:20", file: "Dukkimusic/lucky robot syndrome.mp3" }, { title: "전하지 못한 부품 (Outro)", duration: "3:30", file: "Dukkimusic/전하지 못한 부품 (Outro).mp3" }] },
        { id: 7001, artistId: 7, title: "신미영의 끝나지 않는 줌 회의실", type: "Single", cover: "Dukkiimage/34.png", songs: [{ title: "신미영의 끝나지 않는 줌 회의실", duration: "3:05", file: "Dukkimusic/신미영의 끝나지 않는 줌 회의실.mp3" }] },
        { id: 7000, artistId: 7, title: "The maybe machine", type: "EP", cover: "Dukkiimage/16.png", songs: [{ title: "비품실에서 피어난 기계", duration: "3:00", file: "Dukkimusic/비품실에서 피어난 기계.mp3" }, { title: "Forgive me GPT", duration: "3:10", file: "Dukkimusic/Forgive me GPT.mp3" }, { title: "Mutopia", duration: "3:20", file: "Dukkimusic/Mutopia.mp3" }] },
        { id: 6999, artistId: 7, title: "Let's Play Dukki", type: "EP", cover: "Dukkiimage/27.png", songs: [{ title: "ND(너에게 당신)", duration: "3:00", file: "Dukkimusic/ND(너에게 당신).mp3" }, { title: "더이상 모른척", duration: "3:15", file: "Dukkimusic/더이상 모른척.mp3" }, { title: "두끼 플레이타임", duration: "3:20", file: "Dukkimusic/두끼 플레이타임.mp3" }] },
        { id: 5001, artistId: 5, title: "펼쳐질 너의 미래 (수능 응원곡)", type: "Single", cover: "Dukkiimage/4.png", songs: [{ title: "펼쳐질 너의 미래", duration: "3:30", file: "Dukkimusic/펼쳐질 너의 미래.mp3" }] },
        { id: 5002, artistId: 5, title: "MINDFILED", type: "EP", cover: "Dukkiimage/10.jpg", songs: [{ title: "Chéri Bomb", duration: "3:10", file: "Dukkimusic/Chéri Bomb.mp3" }, { title: "저 바다 너머로", duration: "3:25", file: "Dukkimusic/저 바다 너머로.mp3" }, { title: "안녕, 여름!", duration: "3:00", file: "Dukkimusic/안녕, 여름!.mp3" }] },
        { id: 5003, artistId: 5, title: "Dukki Universe (Project Rebron)", type: "EP", cover: "Dukkiimage/49.png", songs: [{ title: "대구의 차은우 두끼 (2025)", duration: "3:05", file: "Dukkimusic/대구의 차은우 두끼 (2025).mp3" }, { title: "두끼님에게 전하는 사랑의 노래 (2025)", duration: "3:30", file: "Dukkimusic/두끼님에게 전하는 사랑의 노래 (2025).mp3" }] },
        { id: 5004, artistId: 5, title: "MELTIE in Love", type: "EP", cover: "Dukkiimage/8.png", songs: [{ title: "Flow", duration: "3:10", file: "Dukkimusic/Flow.mp3" }, { title: "Lalala", duration: "3:00", file: "Dukkimusic/Lalala.mp3" }, { title: "Lalala (Sped Up)", duration: "2:40", file: "Dukkimusic/Lalala (Sped Up).mp3" }, { title: "When the Light Fades", duration: "3:30", file: "Dukkimusic/When the Light Fades.mp3" }, { title: "Sweet Spring Day", duration: "3:15", file: "Dukkimusic/Sweet Spring Day.mp3" }] },
        { id: 6001, artistId: 6, title: "무지개커튼사용법ㅉ", type: "EP", cover: "Dukkiimage/53.png", songs: [{ title: "Congratulations!", duration: "3:15", file: "Dukkimusic/Congratulations!.mp3" }, { title: "God Field 매드무비", duration: "3:20", file: "Dukkimusic/God Field 매드무비.mp3" }] },
        { id: 6002, artistId: 6, title: "쑤캐아 냉장고 처먹어", type: "EP", cover: "Dukkiimage/50.png", songs: [{ title: "쑤캐아 냉장고 처먹어", duration: "3:00", file: "Dukkimusic/쑤캐아 냉장고 처먹어.mp3" }, { title: "쑤캐아 냉장고 처먹어 (JPN VER)", duration: "3:05", file: "Dukkimusic/쑤캐아 냉장고 처먹어 (JPN VER).mp3" }, { title: "쑤캐아 냉장고 처먹어 (JPN VER) (NightCore)", duration: "2:30", file: "Dukkimusic/쑤캐아 냉장고 처먹어 (JPN VER) (NightCore).mp3" }] },
        { id: 6003, artistId: 6, title: "쑤캐아는 농약을 좋아해", type: "Single", cover: "Dukkiimage/52.png", songs: [{ title: "쑤캐아는 농약을 좋아해", duration: "3:10", file: "Dukkimusic/쑤캐아는 농약을 좋아해.mp3" }] },
        { id: 9009, artistId: 9, title: "สวัสดีรัก", type: "EP", cover: "Dukkiimage/51.png", songs: [{ title: "사왓디 사랑", duration: "3:00", file: "Dukkimusic/사왓디 사랑.mp3" }, { title: "사왓디 사랑 (Sped Up)", duration: "2:30", file: "Dukkimusic/사왓디 사랑 (Sped Up).mp3" }, { title: "민재의 사랑", duration: "3:10", file: "Dukkimusic/민재의 사랑.mp3" }] },
        { id: 4001, artistId: 4, title: "SIRIUS", type: "EP", cover: "Dukkiimage/54.png", songs: [{ title: "소녀의 우주", duration: "3:40", file: "Dukkimusic/소녀의 우주.mp3" }, { title: "푸른빛 도서관", duration: "3:25", file: "Dukkimusic/푸른빛 도서관.mp3" }, { title: "트라우마", duration: "3:35", file: "Dukkimusic/트라우마.mp3" }, { title: "Dream of Freedom", duration: "3:10", file: "Dukkimusic/Dream of Freedom.mp3" }, { title: "우주를 보여주고파 (outro)", duration: "1:30", file: "Dukkimusic/우주를 보여주고파 (outro).mp3" }] },
        { id: 3001, artistId: 3, title: "KKG", type: "Single", cover: "Dukkiimage/3.png", songs: [{ title: "FXXK 수능", duration: "3:10", file: "Dukkimusic/FXXK 수능.mp3" }] },
    ]
};

let playQueue = [];
let currentIndex = 0;
let isPlaying = false;
let playlists = JSON.parse(localStorage.getItem('playlists')) || []; // 플레이리스트 데이터
let recentAlbumIds = JSON.parse(localStorage.getItem('dukki_recent_albums')) || [];
let currentViewId = 'home';
let currentEntityId = null;
let trackToAdd = { albumId: null, trackIndex: null }; // 플레이리스트 모달용 임시 변수

const audioPlayer = new Audio();


/* =========================================================
   [2] 핵심 공통 유틸리티
   ========================================================= */

function getArtistName(id) { 
    return data.artists.find(a => a.id === id)?.name || 'Unknown'; 
}

// **[수정]** 페이지 이동 및 히스토리 관리
function navigateTo(viewId, entityId = null, isBack = false) {
    const mainViews = ['home', 'search', 'library', 'all-artists'];
    
    // 1. 뒤로가기가 아니고, 현재 뷰가 있다면 히스토리에 저장
    if (!isBack) {
        if (mainViews.includes(viewId)) {
            historyStack = []; // 메인 탭 클릭 시 히스토리 초기화
        } else if (currentViewId) {
            // 상세 페이지 진입 시 현재 위치 저장
            historyStack.push({ view: currentViewId, id: currentEntityId });
        }
    }

    // 2. 뷰 전환 (기존 로직)
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.add('hidden'));

    document.getElementById(viewId).classList.remove('hidden');

    const navItems = document.querySelectorAll('.nav-item, .sidebar-item');
    navItems.forEach(item => item.classList.remove('active'));

    const activeNavs = document.querySelectorAll(`[onclick*="navigateTo('${viewId}')"]`);
    activeNavs.forEach(nav => nav.classList.add('active'));

    currentViewId = viewId;
    currentEntityId = entityId;

    // 3. 각 화면별 데이터 렌더링 (기존 로직)
    if (viewId === 'album' && entityId !== null) {
        renderAlbumDetail(entityId);
    } else if (viewId === 'artist' && entityId !== null) {
        renderArtistDetail(entityId);
    } else if (viewId === 'library') {
        renderPlaylists();
    } else if (viewId === 'playlist-detail' && entityId !== null) {
        renderPlaylistDetail(entityId);
    } else if (viewId === 'search') {
        document.getElementById('search-input').value = '';
        document.getElementById('search-empty-state').classList.remove('hidden');
        document.getElementById('search-results-area').classList.add('hidden');
    }

    // 4. 스크롤 맨 위로
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;

    // 5. [중요] 뒤로가기 버튼 표시 여부 업데이트
    updateBackButtonState();
}

/* =========================================================
   [3] 홈 & 아티스트 & 앨범 렌더링
   ========================================================= */

// **[수정/통합]** 홈 화면 렌더링
function renderHomeContent() {
    const recentSection = document.getElementById('recent-section');
    const recentList = document.getElementById('recent-list');
    
    // 1. 최근 재생 목록
    const recentAlbums = recentAlbumIds
        .map(id => data.albums.find(a => a.id === id))
        .filter(a => a);

    if(recentAlbums.length > 0) {
        recentSection.style.display = 'block';
        recentList.innerHTML = recentAlbums.map(album => 
            `<div class="scroll-card" onclick="navigateTo('album', ${album.id})">
                <div class="album-square-img" style="background-image:url('${album.cover}')"></div>
                <div class="album-title-text">${album.title}</div>
                <div class="album-artist-text">${getArtistName(album.artistId)}</div>
            </div>`
        ).join('');
    } else { recentSection.style.display = 'none'; }

    // 2. 인기 아티스트
    const artistHomeList = document.getElementById('artist-home-list');
    const randomArtists = [...data.artists].sort(() => 0.5 - Math.random()).slice(0, 4);
    artistHomeList.innerHTML = randomArtists.map(a => 
        `<div class="scroll-card" onclick="navigateTo('artist', ${a.id})">
            <div class="artist-circle-img" style="background-image:url('${a.img}')"></div>
            <div class="artist-circle-name">${a.name}</div>
        </div>`
    ).join('');

    // 3. 추천 앨범
    const recommendedList = document.getElementById('recommended-list');
    const randomAlbums = [...data.albums].sort(() => 0.5 - Math.random()).slice(0, 15);
    recommendedList.innerHTML = randomAlbums.map(album => 
        `<div class="scroll-card" onclick="navigateTo('album', ${album.id})">
            <div class="album-square-img" style="background-image:url('${album.cover}')"></div>
            <div class="album-title-text">${album.title}</div>
            <div class="album-artist-text">${getArtistName(album.artistId)}</div>
        </div>`
    ).join('');

     // [수정됨] 4. 최신 발매 (위에서 설정한 ID 목록대로 불러오기)
    const newReleasesList = document.getElementById('new-releases-list');
    if (newReleasesList) {
        // 설정한 ID에 해당하는 앨범만 찾아서 가져옵니다.
        const newAlbums = NEW_RELEASE_IDS.map(id => data.albums.find(a => a.id === id)).filter(a => a);
        
        newReleasesList.innerHTML = newAlbums.map(album => 
            `<div class="scroll-card" onclick="navigateTo('album', ${album.id})">
                <div class="album-square-img" style="background-image:url('${album.cover}')"></div>
                <div class="album-title-text">${album.title}</div>
                <div class="album-artist-text">${getArtistName(album.artistId)}</div>
            </div>`
        ).join('');
    }


 // [NEW] 데일리 믹스 렌더링 추가
    const dailyMixList = document.getElementById('daily-mix-list');
    if (dailyMixList) {
        // 시각적으로 다르게 보이는 3개의 믹스 카드를 생성 (기능은 동일하게 랜덤 재생)
        const mixes = [
            { title: "Daily Mix 1", color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
            { title: "Daily Mix 2", color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
            { title: "Daily Mix 3", color: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" }
        ];

        dailyMixList.innerHTML = mixes.map(mix => `
            <div class="scroll-card" onclick="playDailyMix()">
                <div class="album-square-img" style="background: ${mix.color}; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-random" style="font-size: 40px; color: rgba(255,255,255,0.8);"></i>
                </div>
                <div class="album-title-text">${mix.title}</div>
                <div class="album-artist-text">두끼 뮤직 추천</div>
            </div>
        `).join('');
    }
}

function renderArtistDetail(id) {
    const artist = data.artists.find(a => a.id === id);
    if (!artist) return;

    document.getElementById('artist-img').style.backgroundImage = `url('${artist.img}')`;
    document.getElementById('artist-name').textContent = artist.name;

    const allAlbums = data.albums.filter(a => a.artistId === id);
    
    const albumsList = document.getElementById('artist-albums');
    albumsList.innerHTML = ''; // 초기화

    // 카테고리별 섹션 생성 함수 (수정됨)
    const createAlbumSection = (title, list, categoryKey) => {
        if(list.length === 0) return '';
        
        return `
            <div class="scroll-section">
                <div class="section-header">
                    <h2>${title}</h2>
                    <span class="view-all-btn" onclick="showArtistCategory(${id}, '${categoryKey}', '${title}')">전체보기</span>
                </div>
                <div class="scroll-row" id="artist-${categoryKey}-list">
                    ${list.map(album => `
                        <div class="scroll-card" onclick="navigateTo('album', ${album.id})">
                            <div class="album-square-img" style="background-image: url('${album.cover}')"></div>
                            <div class="album-title-text">${album.title}</div>
                            <div class="album-artist-text">${album.type}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    const regularAlbums = allAlbums.filter(a => a.type === 'Album');
    const eps = allAlbums.filter(a => a.type === 'EP');
    const singles = allAlbums.filter(a => a.type === 'Single' || a.type === 'Single Album');

    albumsList.innerHTML += createAlbumSection('정규 앨범', regularAlbums, 'regular');
    albumsList.innerHTML += createAlbumSection('EP', eps, 'ep');
    albumsList.innerHTML += createAlbumSection('싱글', singles, 'single');
    
    if (albumsList.innerHTML === '') albumsList.innerHTML = '<div style="color:#777; text-align:center; padding:40px;">등록된 앨범이 없습니다.</div>';
}



// **[수정]** 앨범 상세 페이지 렌더링 (타이틀 배지 + 재생 금지 로직 포함)
function renderAlbumDetail(id) {
    // 최근 재생 목록 업데이트
    recentAlbumIds = recentAlbumIds.filter(x => x !== id);
    recentAlbumIds.unshift(id);
    if(recentAlbumIds.length > 10) recentAlbumIds.pop();
    localStorage.setItem('dukki_recent_albums', JSON.stringify(recentAlbumIds));

    const album = data.albums.find(a => a.id === id);
    if (!album) return;
    const artist = data.artists.find(a => a.id === album.artistId);
    
    document.getElementById('album-cover').style.backgroundImage = `url('${album.cover}')`;
    document.getElementById('album-title').textContent = album.title;
    document.getElementById('album-type').textContent = album.type;
    document.getElementById('album-artist').textContent = artist.name;

    const albumBtns = document.getElementById('album-btns');
    const safeAlbumTitle = album.title.replace(/'/g, "\\'");
    
    albumBtns.innerHTML = `
        <button class="action-btn play-btn" onclick="playAlbum(${album.id})"><i class="fas fa-play"></i> <span>모두 재생</span></button>
        <button class="action-btn shuffle-btn" onclick="shuffleAlbum(${album.id})"><i class="fas fa-random"></i> <span>셔플 재생</span></button>
        <button class="action-btn info-btn" onclick="openAlbumInfo('${safeAlbumTitle}')"><i class="fas fa-info-circle"></i> <span>정보</span></button>
    `;

    const trackList = document.getElementById('track-list');
    trackList.innerHTML = album.songs.map((song, index) => {
        const safeTitle = song.title.replace(/'/g, "\\'");
        const safeArtist = artist.name.replace(/'/g, "\\'");
        const safeCover = album.cover.replace(/'/g, "\\'");
        const safeFile = song.file ? song.file.replace(/'/g, "\\'") : '';

        // [1] 타이틀 배지 확인
        const titleBadge = TITLE_TRACKS.includes(song.title) 
            ? '<span class="title-badge">TITLE</span>' 
            : '';

        // [2] 금지 곡 확인 (NEW)
        const isBanned = BANNED_TRACKS.includes(song.title);
        const rowClass = isBanned ? 'track-row track-disabled' : 'track-row';
        const onClickAction = isBanned ? '' : `playImmediate('${safeTitle}', '${safeArtist}', '${safeCover}', '${song.duration}', '${safeFile}')`;

        return `
            <div class="${rowClass}" onclick="${onClickAction}">
                <div class="track-num">${index + 1}</div>
                <div class="track-info">
                    <div class="track-title">${titleBadge}${song.title}</div>
                    <div class="track-artist">${artist.name}</div>
                </div>
                <button class="pl-add-btn" onclick="event.stopPropagation(); openPlModal(${album.id}, ${index})">
                    <i class="fas fa-folder-plus"></i>
                </button>
                <button class="add-btn" onclick="event.stopPropagation(); addToQueue('${safeTitle}', '${safeArtist}', '${safeCover}', '${song.duration}', '${safeFile}')">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
    }).join('');
}
/* =========================================================
   [4] 플레이어 핵심 로직
   ========================================================= */

audioPlayer.addEventListener('timeupdate', () => {
    const miniBar = document.getElementById('mini-bar');
    const fpBar = document.getElementById('fp-bar');
    const currTimeTxt = document.getElementById('curr-time');

    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        if(miniBar) miniBar.style.width = percent + '%';
        if(fpBar) fpBar.style.width = percent + '%';

        const currSec = Math.floor(audioPlayer.currentTime);
        const m = Math.floor(currSec / 60);
        const s = currSec % 60;
        if(currTimeTxt) currTimeTxt.innerText = `${m}:${s<10?'0'+s:s}`;
    }
});

audioPlayer.addEventListener('ended', () => {
    nextSong();
});

function addToQueue(title, artist, cover, duration, file) {
    playQueue.push({ title, artist, cover, duration, file });
    if(playQueue.length === 1 && !isPlaying) setTrack(0);
    alert("재생 목록에 추가되었습니다!");
    renderQueue();
}

function playImmediate(title, artist, cover, duration, file) {
    playQueue = [{ title, artist, cover, duration, file }];
    isPlaying = true;
    setTrack(0);
    updatePlayStatus();
    openFullPlayer();
    renderQueue();

    // 가사 뷰 초기화
    document.getElementById('fp-lyrics-view').classList.add('hidden');
    document.getElementById('fp-img-container').classList.remove('hidden');
    document.getElementById('fp-info').classList.remove('hidden');
    document.getElementById('fp-progress-box').classList.remove('hidden');
    if(document.getElementById('fp-lyrics-btn')) document.getElementById('fp-lyrics-btn').style.color = '#ccc';
}

function fetchLyrics(title) {
    const lyricsElem = document.getElementById('fp-lyrics-content');
    if(!lyricsElem) return;
    
    lyricsElem.innerHTML = "가사를 불러오는 중입니다..."; // innerHTML로 변경
       const path = `Dukkilyrics/${title}.txt`;
    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error("Lyrics file not found");
            return response.text();
        })
.then(text => { 
    //씨발
    let sibalhtml = text;
    lyricsElem.innerHTML = sibalhtml.replace(/\\n/g, "<br>");

   // console.log(bindhtml);
})
}
function setTrack(index) {
    if(index < 0 || index >= playQueue.length) return;
    currentIndex = index;
    const track = playQueue[index];

    // ... (기존 UI 업데이트 코드들: mini-title, fp-title 등) ...
    document.getElementById('mini-title').innerText = track.title;
    document.getElementById('mini-artist').innerText = track.artist;
    document.getElementById('mini-img').src = track.cover;

    document.getElementById('fp-title').innerText = track.title;
    document.getElementById('fp-artist').innerText = track.artist;
    document.getElementById('fp-img').src = track.cover;
    document.getElementById('fp-bg').style.backgroundImage = `url('${track.cover}')`;
    document.getElementById('total-time').innerText = track.duration;

    fetchLyrics(track.title);

    // ============================================================
    // [NEW] Media Session API 메타데이터 업데이트 (여기 추가!)
    // ============================================================
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: "DUKKI MUSIC", // 앨범명이 따로 변수에 없다면 고정값 혹은 track 객체에 추가 필요
            artwork: [
                { src: track.cover, sizes: '512x512', type: 'image/jpeg' },
                { src: track.cover, sizes: '512x512', type: 'image/png' }
            ]
        });
    }
    // ============================================================

    if(track.file) {
        audioPlayer.src = track.file;
        if(isPlaying) audioPlayer.play().catch(e => console.log("재생 오류:", e));
    }
    renderQueue();
}


function togglePlay() {
    if(playQueue.length === 0) return;
    isPlaying = !isPlaying;
    isPlaying ? audioPlayer.play() : audioPlayer.pause();
    updatePlayStatus();
}

function updatePlayStatus() {
    const miniIcon = document.getElementById('mini-play-btn');
    const pcIcon = document.getElementById('pc-play-icon');
    const fpIcon = document.getElementById('fp-play-icon');

    if(isPlaying) {
        if(miniIcon) miniIcon.classList.replace('fa-play', 'fa-pause');
        if(pcIcon) pcIcon.classList.replace('fa-play', 'fa-pause');
        if(fpIcon) fpIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        if(miniIcon) miniIcon.classList.replace('fa-pause', 'fa-play');
        if(pcIcon) pcIcon.classList.replace('fa-pause', 'fa-play');
        if(fpIcon) fpIcon.classList.replace('fa-pause', 'fa-play');
    }
}

function nextSong() {
    if (document.getElementById('fp-lyrics-view') && !document.getElementById('fp-lyrics-view').classList.contains('hidden')) toggleLyrics();
    if(currentIndex < playQueue.length - 1) {
        setTrack(currentIndex + 1);
        if(!isPlaying) { isPlaying = true; updatePlayStatus(); }
    } else {
        isPlaying = false;
        updatePlayStatus();
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
}

function prevSong() {
    if (document.getElementById('fp-lyrics-view') && !document.getElementById('fp-lyrics-view').classList.contains('hidden')) toggleLyrics();
    if(audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
    } else {
        if(currentIndex > 0) setTrack(currentIndex - 1);
        if(!isPlaying) { isPlaying = true; updatePlayStatus(); }
    }
}

function openFullPlayer() {
    if(playQueue.length > 0) {
        document.getElementById('full-player').classList.add('active');
        document.body.classList.add('fp-open'); // [추가] 풀 플레이어 열림 상태 표시
    }
}

function closeFullPlayer() {
    document.getElementById('full-player').classList.remove('active');
    document.body.classList.remove('fp-open'); // [추가] 풀 플레이어 닫힘 상태 해제
}
function toggleLyrics() {
    const lyricsView = document.getElementById('fp-lyrics-view');
    const imgContainer = document.getElementById('fp-img-container');
    const infoBox = document.getElementById('fp-info'); // 제목/아티스트를 담는 박스
    const progressBar = document.getElementById('fp-progress-box'); 
    const lyricsBtn = document.getElementById('fp-lyrics-btn');
    
    // PC에서만 투명도를 조절하는 로직이 있었으나, 이제 화면 크기를 확인하여 모바일에서만 숨김 처리합니다.
    const isPC = window.innerWidth >= 768; 

    if (!lyricsView) return;

    if (!lyricsView.classList.contains('hidden')) {
        // 가사 닫기
        lyricsView.classList.add('hidden');
        if(imgContainer) imgContainer.classList.remove('hidden');
        
        // [수정 사항: PC 환경에서 진행 바를 숨기지 않음]
        if(!isPC && progressBar) progressBar.classList.remove('hidden'); 
        
        if(lyricsBtn) lyricsBtn.style.color = '#ccc';
        
        // [수정 사항: PC 환경에서 제목/아티스트 투명도 조절 로직 완전 제거]
        if(!isPC) {
             // 모바일일 때는 기존처럼 infoBox 전체를 보이게 합니다.
             if(infoBox) infoBox.classList.remove('hidden');
        }

    } else {
        // 가사 열기
        lyricsView.classList.remove('hidden');
        if(imgContainer) imgContainer.classList.add('hidden');
        
        // [수정 사항: PC 환경에서 진행 바를 숨기지 않음]
        if(!isPC && progressBar) progressBar.classList.add('hidden'); 
        
        if(lyricsBtn) lyricsBtn.style.color = 'var(--primary)';

        // [수정 사항: PC 환경에서 제목/아티스트 투명도 조절 로직 완전 제거]
        if(!isPC) {
            // 모바일일 때는 기존처럼 infoBox 전체를 숨깁니다.
            if(infoBox) infoBox.classList.add('hidden');
        }
    }
}
function toggleQueue() { 
    const modal = document.getElementById('queue-modal'); 
    if(!modal) return;
    if(modal.classList.contains('open')) modal.classList.remove('open'); 
    else { renderQueue(); modal.classList.add('open'); } 
}

function renderQueue() {
    const list = document.getElementById('queue-list-container');
    if(!list) return;

    if(playQueue.length === 0) {
        list.innerHTML = "<div style='color:#777; text-align:center; margin-top:50px;'>재생 목록이 비어있습니다.</div>";
        return;
    }
    list.innerHTML = playQueue.map((track, i) => {
        const clickHandler = `setTrack(${i}); isPlaying = true; audioPlayer.play().catch(e=>console.log(e)); updatePlayStatus(); renderQueue();`;
        return `<div class="queue-item ${i === currentIndex ? 'current' : ''}" onclick="${clickHandler}"><div style="width:30px; text-align:center;">${i+1}</div><div style="flex:1; margin-left:10px;"><div style="font-size:14px; font-weight:900;">${track.title}</div><div style="font-size:12px; color:#aaa;">${track.artist}</div></div>${i === currentIndex ? '<i class="fas fa-volume-up"></i>' : ''}</div>`;
    }).join('');
    
    const currentItem = list.querySelector('.queue-item.current');
    if (currentItem) currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function seek(e) {
    if (!audioPlayer.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
}

// 1. 앨범 전체 재생 (금지 곡 제외)
function playAlbum(id) {
    const album = data.albums.find(a => a.id === id);
    if (!album) return;
    const artist = data.artists.find(a => a.id === album.artistId);
    
    // [수정] 금지 곡을 제외하고 필터링
    const validSongs = album.songs.filter(s => !BANNED_TRACKS.includes(s.title));

    if (validSongs.length === 0) {
        alert("재생 가능한 곡이 없습니다.");
        return;
    }

    playQueue = validSongs.map(s => ({ 
        title: s.title, 
        artist: artist.name, 
        cover: album.cover, 
        duration: s.duration, 
        file: s.file 
    }));
    
    isPlaying = true;
    setTrack(0);
    updatePlayStatus();
    openFullPlayer();
}

// 2. 앨범 셔플 재생 (금지 곡 제외)
function shuffleAlbum(id) {
    const album = data.albums.find(a => a.id === id);
    if (!album) return;
    const artist = data.artists.find(a => a.id === album.artistId);

    // [수정] 금지 곡을 제외하고 필터링
    const validSongs = album.songs.filter(s => !BANNED_TRACKS.includes(s.title));

    if (validSongs.length === 0) {
        alert("재생 가능한 곡이 없습니다.");
        return;
    }

    let tracks = validSongs.map(s => ({ 
        title: s.title, 
        artist: artist.name, 
        cover: album.cover, 
        duration: s.duration, 
        file: s.file 
    }));

    // 셔플 로직
    for (let i = tracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    playQueue = tracks;
    isPlaying = true;
    setTrack(0);
    updatePlayStatus();
    openFullPlayer();
}


/* =========================================================
   [5] 플레이리스트 & 라이브러리 로직 (통합/수정)
   ========================================================= */
let currentPlaylistId = null;

// 라이브러리 페이지와 사이드바 플레이리스트 목록을 렌더링
// 3. 플레이리스트 전체 재생 (금지 곡 제외)
function playPlaylist(id) {
    const pl = playlists.find(p => p.id === id);
    if (pl && pl.songs.length > 0) {
        
        // [수정] 금지 곡 제외
        const validSongs = pl.songs.filter(s => !BANNED_TRACKS.includes(s.title));

        if (validSongs.length === 0) {
            alert("재생 가능한 곡이 없습니다.");
            return;
        }

        playQueue = validSongs.map(s => ({
            title: s.title,
            artist: s.artist,
            cover: s.cover,
            duration: s.duration,
            file: s.file
        }));

        setTrack(0);
        isPlaying = true;
        updatePlayStatus();
        openFullPlayer();
    } else if (pl && pl.songs.length === 0) {
        alert("플레이리스트가 비어있습니다.");
    }
}
// 새 플레이리스트 생성
function createPlaylist() {
    const name = prompt("새 플레이리스트 제목을 입력하세요:", "나의 새 플레이리스트");
    if (name && name.trim() !== "") {
        playlists.push({
            id: Date.now(),
            name: name.trim(),
            songs: []
        });
        localStorage.setItem('playlists', JSON.stringify(playlists));
        renderPlaylists();
        navigateTo('library');
    }
}

// 플레이리스트 상세 페이지 렌더링
function renderPlaylistDetail(id) {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return;
    
    currentPlaylistId = id; // 현재 보고 있는 ID 저장

    document.getElementById('pl-title').textContent = pl.name;
    document.getElementById('pl-count').textContent = `${pl.songs.length}곡 • 저장됨`;
    
    const cover = pl.songs.length > 0 ? `url('${pl.songs[0].cover}')` : 'linear-gradient(45deg, #444, #111)';
    document.getElementById('pl-cover').style.backgroundImage = cover;

    // 재생 버튼에 클릭 이벤트 설정
    document.getElementById('pl-play-btn').onclick = () => { playPlaylist(id); };

    // 트랙 목록 렌더링
    const trackList = document.getElementById('pl-track-list');
    if(pl.songs.length === 0) {
        trackList.innerHTML = "<div style='text-align:center; color:#777; padding:40px;'>아직 담긴 곡이 없습니다.<br>앨범에서 곡을 추가해보세요!</div>";
    } else {
        trackList.innerHTML = pl.songs.map((s, i) => {
            const safeTitle = s.title.replace(/'/g, "\\'");
            const safeArtist = s.artist.replace(/'/g, "\\'");
            const safeCover = s.cover.replace(/'/g, "\\'");
            const safeFile = s.file ? s.file.replace(/'/g, "\\'") : '';
            return `
                <div class="track-row" onclick="playImmediate('${safeTitle}', '${safeArtist}', '${safeCover}', '${s.duration}', '${safeFile}')">
                    <div class="track-num">${i + 1}</div>
                    <div class="track-info">
                        <div class="track-title">${s.title}</div>
                        <div class="track-artist">${s.artist}</div>
                    </div>
                    <button class="trash-btn" onclick="event.stopPropagation(); removeSongFromPlaylist(${id}, ${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
}

// 플레이리스트 전체 재생
function playPlaylist(id) {
    const pl = playlists.find(p => p.id === id);
    if (pl && pl.songs.length > 0) {
        playQueue = pl.songs.map(s => ({
            title: s.title,
            artist: s.artist,
            cover: s.cover,
            duration: s.duration,
            file: s.file
        }));
        setTrack(0);
        isPlaying = true;
        updatePlayStatus();
        openFullPlayer();
    }
}

// 플레이리스트에서 곡 삭제
function removeSongFromPlaylist(plId, songIndex) {
    const pl = playlists.find(p => p.id === plId);
    if (pl) {
        if (confirm("정말로 이 곡을 플레이리스트에서 삭제하시겠습니까?")) {
            pl.songs.splice(songIndex, 1);
            localStorage.setItem('playlists', JSON.stringify(playlists));
            renderPlaylistDetail(plId); // 상세 페이지 갱신
            renderPlaylists(); // 라이브러리 및 사이드바 갱신
        }
    }
}

// 플레이리스트 자체 삭제
function deletePlaylistCurrent() {
    if (currentPlaylistId) {
        const pl = playlists.find(p => p.id === currentPlaylistId);
        if (pl && confirm(`정말로 '${pl.name}' 플레이리스트를 삭제하시겠습니까?`)) {
            playlists = playlists.filter(p => p.id !== currentPlaylistId);
            localStorage.setItem('playlists', JSON.stringify(playlists));
            renderPlaylists();
            navigateTo('library');
        }
    }
}

// 곡을 담기 위한 모달 열기
function openPlModal(albumId, trackIndex) {
    if (playlists.length === 0) {
        if(confirm("생성된 플레이리스트가 없습니다. 먼저 만드시겠습니까?")) {
            createPlaylist();
        }
        return;
    }

    trackToAdd = { albumId, trackIndex };
    renderPlSelectModal();
    document.getElementById('pl-select-modal').classList.add('open');
}

// 모달 닫기
function closePlModal() {
    document.getElementById('pl-select-modal').classList.remove('open');
}

// 플레이리스트 선택 모달 목록 렌더링
function renderPlSelectModal() {
    const list = document.getElementById('pl-select-list');
    
    list.innerHTML = playlists.map((pl) => {
        const coverImg = pl.songs.length > 0 ? pl.songs[0].cover : 'Dukkiimage/logo.png';
        return `
            <div class="queue-item" onclick="addTrackToPlaylist(${pl.id})">
                <div style="background-image:url('${coverImg}'); width:40px; height:40px; background-size:cover; border-radius:4px; margin-right:10px;"></div>
                <div style="flex:1;">
                    <div style="font-weight:900; font-size:14px;">${pl.name}</div>
                    <div style="font-size:12px; color:#aaa;">${pl.songs.length}곡</div>
                </div>
                <i class="fas fa-plus" style="color:var(--primary);"></i>
            </div>
        `;
    }).join('');
}

// 플레이리스트에 곡 추가
function addTrackToPlaylist(plId) {
    const album = data.albums.find(a => a.id === trackToAdd.albumId);
    if (!album) return;

    const artist = data.artists.find(a => a.id === album.artistId);
    const song = album.songs[trackToAdd.trackIndex];
    const pl = playlists.find(p => p.id === plId);

    if (pl) {
        const newSong = {
            title: song.title,
            artist: artist.name,
            cover: album.cover,
            duration: song.duration,
            file: song.file
        };

        pl.songs.push(newSong);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        alert(`${album.title}의 ${song.title}을(를) '${pl.name}'에 담았습니다!`);
        
        closePlModal();
        renderPlaylists();
    }
}


/* =========================================================
   [6] 검색 관련 로직 (새로 추가)
   ========================================================= */

// 검색 결과를 렌더링하는 핵심 함수
function performSearch(query) {
    const q = query.toLowerCase().trim();
    const resultsArea = document.getElementById('search-results-area');
    const emptyState = document.getElementById('search-empty-state');
    const noResultMsg = document.getElementById('no-result-msg');

    if (q.length === 0) {
        resultsArea.classList.add('hidden');
        emptyState.classList.remove('hidden');
        if(noResultMsg) noResultMsg.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    
    // 1. 아티스트 검색
    const foundArtists = data.artists.filter(artist => 
        artist.name.toLowerCase().includes(q)
    );

    // 2. 앨범 검색 (제목 기준)
    const foundAlbums = data.albums.filter(album => 
        album.title.toLowerCase().includes(q)
    );
    
    // 3. 곡 검색 (제목 또는 아티스트 이름 기준)
    let foundSongs = [];
    data.albums.forEach(album => {
        const artist = data.artists.find(a => a.id === album.artistId);
        album.songs.forEach((song, index) => {
            if (song.title.toLowerCase().includes(q) || artist.name.toLowerCase().includes(q)) {
                foundSongs.push({
                    title: song.title,
                    artist: artist.name,
                    cover: album.cover,
                    albumId: album.id,
                    trackIndex: index // 재생을 위해 트랙 인덱스 저장
                });
            }
        });
    });

    renderSearchResults(foundArtists, foundAlbums, foundSongs, q);
    resultsArea.classList.remove('hidden');
}

// 검색 결과를 DOM에 업데이트하는 함수
function renderSearchResults(artists, albums, songs, query) {
    const artistSection = document.getElementById('search-artist-section');
    const albumSection = document.getElementById('search-album-section');
    const songSection = document.getElementById('search-song-section');
    const noResultMsg = document.getElementById('no-result-msg');

    // 아티스트 결과
    const artistList = document.getElementById('search-artist-list');
    if (artists.length > 0) {
        artistSection.classList.remove('hidden');
        artistList.innerHTML = artists.map(artist => 
            `<div class="scroll-card" onclick="navigateTo('artist', ${artist.id})">
                <div class="artist-circle-img" style="background-image: url('${artist.img}')"></div>
                <div class="artist-circle-name">${artist.name}</div>
            </div>`
        ).join('');
    } else {
        artistSection.classList.add('hidden');
    }

    // 앨범 결과
    const albumList = document.getElementById('search-album-list');
    if (albums.length > 0) {
        albumSection.classList.remove('hidden');
        albumList.innerHTML = albums.map(album => 
            `<div class="scroll-card" onclick="navigateTo('album', ${album.id})">
                <div class="album-square-img" style="background-image: url('${album.cover}')"></div>
                <div class="album-title-text">${album.title}</div>
                <div class="album-artist-text">${data.artists.find(a => a.id === album.artistId).name}</div>
            </div>`
        ).join('');
    } else {
        albumSection.classList.add('hidden');
    }

    // 곡 결과
  // ... renderSearchResults 함수 내부 ...

    // 곡 결과
  // ... renderSearchResults 함수 내부 ...
    const songList = document.getElementById('search-song-list');
    if (songs.length > 0) {
        songSection.classList.remove('hidden');
        songList.innerHTML = songs.map((s, index) => {
            const safeTitle = s.title.replace(/'/g, "\\'");
            const safeArtist = s.artist.replace(/'/g, "\\'");
            const safeCover = s.cover.replace(/'/g, "\\'");
            const albumId = s.albumId;
            const trackIndex = s.trackIndex;
            const album = data.albums.find(a => a.id === albumId);
            const duration = album.songs[trackIndex].duration;
            const file = album.songs[trackIndex].file.replace(/'/g, "\\'");

            const titleBadge = TITLE_TRACKS.includes(s.title) ? '<span class="title-badge">TITLE</span>' : '';
            
            // [NEW] 금지 곡 로직
            const isBanned = BANNED_TRACKS.includes(s.title);
            const rowClass = isBanned ? 'track-row track-disabled' : 'track-row';
            const onClickAction = isBanned ? '' : `playImmediate('${safeTitle}', '${safeArtist}', '${safeCover}', '${duration}', '${file}')`;

            return `
                <div class="${rowClass}" onclick="${onClickAction}">
                    <div class="track-num">${index + 1}</div>
                    <div class="track-info">
                        <div class="track-title">${titleBadge}${s.title}</div>
                        <div class="track-artist">${s.artist}</div>
                    </div>
                    <button class="pl-add-btn" onclick="event.stopPropagation(); openPlModal(${albumId}, ${trackIndex})"><i class="fas fa-folder-plus"></i></button>
                    <button class="add-btn" onclick="event.stopPropagation(); addToQueue('${safeTitle}', '${safeArtist}', '${safeCover}', '${duration}', '${file}')"><i class="fas fa-plus"></i></button>
                </div>
            `;
        }).join('');
    }
   
    // 결과 없음 메시지
    if (artists.length === 0 && albums.length === 0 && songs.length === 0) {
        noResultMsg.classList.remove('hidden');
    } else {
        noResultMsg.classList.add('hidden');
    }
}

/* =========================================================
   [7] 초기화 및 시작
   ========================================================= */

function init() {
    renderHomeContent();
    renderAllArtists(); // ⭐ 아티스트 전체 목록을 로드합니다. (이전 문제 해결)
    renderPlaylists(); // 플레이리스트를 로드합니다.
    navigateTo('home'); // 초기 화면을 'home'으로 설정합니다.
}
/* =========================================================
   [8] 앨범 정보 모달 로직 (추가됨)
   ========================================================= */

function openAlbumInfo(albumTitle) {
    const modal = document.getElementById('album-info-modal');
    const contentBox = document.getElementById('album-info-content');
    
    if (!modal || !contentBox) return;

    // 모달 열기
    modal.classList.add('open');
    contentBox.innerText = "정보를 불러오는 중입니다...";

    // GitHub Raw 데이터 URL 생성 (특수문자 및 공백 처리)
    // 주의: GitHub UI 주소(tree)가 아닌 Raw 데이터 주소(raw.githubusercontent.com)를 사용해야 fetch가 가능합니다.
    const rawBaseUrl = "https://raw.githubusercontent.com/WBUCK131/DUKKI_MUSIC/main/Dukkiinfo/";
    const targetUrl = rawBaseUrl + encodeURIComponent(albumTitle) + ".txt";

    fetch(targetUrl)
        .then(response => {
            if (!response.ok) {
                if(response.status === 404) throw new Error("정보 파일이 존재하지 않습니다.");
                throw new Error("네트워크 오류");
            }
            return response.text();
        })
        .then(text => {
            contentBox.innerText = text;
        })
        .catch(error => {
            contentBox.innerText = "앨범 정보를 불러올 수 없습니다.\n\n(" + error.message + ")";
        });
}

function closeAlbumInfo() {
    const modal = document.getElementById('album-info-modal');
    if (modal) modal.classList.remove('open');
}

// **[추가]** 뒤로가기 동작
function goBack() {
    if (historyStack.length === 0) return;

    const prevState = historyStack.pop(); // 가장 최근 기록 꺼내기
    navigateTo(prevState.view, prevState.id, true); // true = 뒤로가기 모드
}

// **[추가]** 버튼 표시/숨김 처리
function updateBackButtonState() {
    const backContainer = document.getElementById('global-back-container');
    
    // 히스토리가 있고, 홈 화면이 아니면 버튼 표시
    if (historyStack.length > 0 && currentViewId !== 'home') {
        backContainer.classList.remove('hidden');
    } else {
        backContainer.classList.add('hidden');
    }
}
// 4. 플레이리스트 셔플 재생 (금지 곡 제외)
function shufflePlaylist() {
    if (!currentPlaylistId) return;

    const pl = playlists.find(p => p.id === currentPlaylistId);
    if (pl && pl.songs.length > 0) {
        
        // [수정] 금지 곡 제외
        const validSongs = pl.songs.filter(s => !BANNED_TRACKS.includes(s.title));

        if (validSongs.length === 0) {
            alert("재생 가능한 곡이 없습니다.");
            return;
        }

        // 1. 곡 목록 복사 및 매핑
        let tracks = validSongs.map(s => ({
            title: s.title,
            artist: s.artist,
            cover: s.cover,
            duration: s.duration,
            file: s.file
        }));

        // 2. 피셔-예이츠 셔플 알고리즘 적용
        for (let i = tracks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
        }

        // 3. 재생 대기열에 넣고 재생 시작
        playQueue = tracks;
        setTrack(0);
        isPlaying = true;
        updatePlayStatus();
        openFullPlayer();
    } else {
        alert("재생할 곡이 없습니다.");
    }
}
/* script.js에 새로 추가 */

function showArtistCategory(artistId, categoryKey, titleText) {
    const artist = data.artists.find(a => a.id === artistId);
    if (!artist) return;

    // 1. 해당 카테고리에 맞는 앨범 필터링
    const allAlbums = data.albums.filter(a => a.artistId === artistId).reverse();
    let targetAlbums = [];

    if (categoryKey === 'regular') {
        targetAlbums = allAlbums.filter(a => a.type === 'Album');
    } else if (categoryKey === 'ep') {
        targetAlbums = allAlbums.filter(a => a.type === 'EP');
    } else if (categoryKey === 'single') {
        targetAlbums = allAlbums.filter(a => a.type === 'Single' || a.type === 'Single Album');
    }

    // 2. 제목 설정
    const fullTitle = `${artist.name} - ${titleText}`;
    document.getElementById('aca-mobile-title').textContent = fullTitle;
    document.getElementById('aca-pc-title').textContent = fullTitle;

    // 3. 그리드 렌더링
    const grid = document.getElementById('aca-grid');
    grid.innerHTML = targetAlbums.map(album => `
        <div class="card" onclick="navigateTo('album', ${album.id})">
            <div class="card-img" style="background-image: url('${album.cover}')"></div>
            <div class="card-title">${album.title}</div>
            <div class="card-sub">${album.type}</div>
        </div>
    `).join('');

    // 4. 화면 이동 (뒤로가기 지원을 위해 히스토리에 현재 뷰 저장 후 이동)
    // 기존 navigateTo 로직을 활용하여 상세 페이지로 이동
    navigateTo('artist-category-all');
    
    // navigateTo에서 entityId 처리가 명확하지 않으므로, 
    // 수동으로 히스토리에 이 상태를 구체적으로 저장하고 싶다면 아래처럼 별도 처리가 필요할 수 있습니다.
    // 하지만 기본적으로 navigateTo('artist-category-all')을 호출하면 
    // navigateTo 함수 내에서 historyStack에 이전 페이지(artist detail)가 저장되므로 뒤로가기가 잘 작동할 것입니다.
}
// [추가] 모든 아티스트 목록 렌더링 함수
function renderAllArtists() {
    const grid = document.getElementById('all-artists-grid');
    if (!grid) return;

    grid.innerHTML = data.artists.map(artist => `
        <div class="card" onclick="navigateTo('artist', ${artist.id})">
            <div class="card-img circle" style="background-image: url('${artist.img}')"></div>
            <div class="card-title" style="text-align:center;">${artist.name}</div>
            <div class="card-sub" style="text-align:center;">Artist</div>
        </div>
    `).join('');
}

// [NEW] 시스템 미디어 세션(잠금화면/알림창) 연동 설정
function setupMediaSession() {
    if ('mediaSession' in navigator) {
        // 재생 버튼
        navigator.mediaSession.setActionHandler('play', function() {
            if (!isPlaying) togglePlay();
        });
        
        // 일시정지 버튼
        navigator.mediaSession.setActionHandler('pause', function() {
            if (isPlaying) togglePlay();
        });

        // 이전 곡 버튼
        navigator.mediaSession.setActionHandler('previoustrack', function() {
            prevSong();
        });

        // 다음 곡 버튼
        navigator.mediaSession.setActionHandler('nexttrack', function() {
            nextSong();
        });

        // (선택사항) 정지 버튼
        navigator.mediaSession.setActionHandler('stop', function() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            isPlaying = false;
            updatePlayStatus();
        });
    }
}
// [추가] 플레이리스트 목록을 화면(보관함 & 사이드바)에 그리는 함수
function renderPlaylists() {
    // 1. 보관함(Library) 화면의 그리드 갱신
    const libraryGrid = document.getElementById('library-grid');
    if (libraryGrid) {
        if (playlists.length === 0) {
            // 플레이리스트가 없을 때 표시할 내용
            libraryGrid.innerHTML = `
                <div class="pl-card-empty" onclick="createPlaylist()" style="grid-column: 1 / -1; cursor: pointer; padding: 40px; text-align: center; border: 2px dashed #333; border-radius: 8px; color: #777;">
                    <i class="fas fa-plus-circle" style="font-size: 30px; margin-bottom: 10px;"></i>
                    <div>새 플레이리스트 만들기</div>
                </div>
            `;
        } else {
            // 플레이리스트 카드 생성
            libraryGrid.innerHTML = playlists.map(pl => {
                // 커버 이미지는 첫 번째 곡의 커버를 사용하거나, 없으면 기본 그라디언트
                const coverImg = pl.songs.length > 0 
                    ? `url('${pl.songs[0].cover}')` 
                    : 'linear-gradient(45deg, #333, #111)';
                
                return `
                    <div class="card" onclick="navigateTo('playlist-detail', ${pl.id})">
                        <div class="card-img" style="background: ${coverImg}; background-size: cover; background-position: center;"></div>
                        <div class="card-title">${pl.name}</div>
                        <div class="card-sub">${pl.songs.length}곡 • 내 플레이리스트</div>
                    </div>
                `;
            }).join('');
        }
    }

    // 2. PC 사이드바 목록 갱신
    const sidebarContainer = document.querySelector('.sidebar-playlist');
    if (sidebarContainer) {
        // 기존 헤더와 '만들기' 버튼은 유지하고 목록만 추가
        const listHtml = playlists.map(pl => 
            `<div class="pl-item" onclick="navigateTo('playlist-detail', ${pl.id})">
                <i class="fas fa-list-ul" style="margin-right: 8px; width: 14px;"></i> ${pl.name}
             </div>`
        ).join('');

        sidebarContainer.innerHTML = `
            <div class="pl-header">내 플레이리스트</div>
            <div class="pl-item" onclick="createPlaylist()">
                <i class="fas fa-plus" style="margin-right: 8px;"></i> 새 플레이리스트 만들기
            </div>
            ${listHtml}
        `;
    }
}
/* [script.js] 맨 아래에 추가 */

// --- 크레딧 모달 관련 함수 ---

function openCreditModal() {
    const modal = document.getElementById('credit-modal');
    if (modal) {
        modal.classList.add('open');
    }
}

function closeCreditModal() {
    const modal = document.getElementById('credit-modal');
    if (modal) {
        modal.classList.remove('open');
    }
}

// [NEW] 데일리 믹스 재생 기능 (30곡 랜덤)
function playDailyMix() {
    // 1. 모든 앨범에서 금지곡을 제외한 모든 곡 수집
    let allSongs = [];
    data.albums.forEach(album => {
        const artist = data.artists.find(a => a.id === album.artistId);
        album.songs.forEach(song => {
            // 금지곡 체크
            if (!BANNED_TRACKS.includes(song.title)) {
                allSongs.push({
                    title: song.title,
                    artist: artist.name,
                    cover: album.cover,
                    duration: song.duration,
                    file: song.file
                });
            }
        });
    });

    if (allSongs.length === 0) {
        alert("재생 가능한 곡이 없습니다.");
        return;
    }

    // 2. 피셔-예이츠 셔플 (랜덤 섞기)
    for (let i = allSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allSongs[i], allSongs[j]] = [allSongs[j], allSongs[i]];
    }

    // 3. 앞에서부터 30곡 자르기 (곡이 30곡 미만이면 전체 선택)
    const dailyTracks = allSongs.slice(0, 30);

    // 4. 플레이어 실행
    playQueue = dailyTracks;
    currentIndex = 0; // 첫 곡부터 시작
    isPlaying = true;
    
    setTrack(0);         // 첫 곡 설정
    updatePlayStatus();  // 재생 상태 업데이트
    openFullPlayer();    // 플레이어 화면 열기
    
    // 알림 메시지 (선택 사항)
    // alert("🎧 데일리 믹스 30곡이 생성되었습니다!");
}


window.onload = init;




































