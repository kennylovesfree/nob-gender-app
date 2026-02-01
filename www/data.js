const pregnancyData = [
    {
        week: 1,
        trimester: "第一孕期",
        baby: "受精卵正在形成，準備著床。",
        mom: "月經剛結束，卵巢正在準備排卵，這是孕期的起點。",
        nutrition: "補充葉酸，預防神經管缺陷。",
        exercise: "保持規律運動，為懷孕做準備。"
    },
    {
        week: 2,
        trimester: "第一孕期",
        baby: "受精發生，寶寶的基因組合已經確定。",
        mom: "排卵期，這是受孕的關鍵時刻。",
        nutrition: "均衡飲食，避免菸酒。",
        exercise: "放鬆心情，減少壓力。"
    },
    {
        week: 3,
        trimester: "第一孕期",
        baby: "受精卵分裂成數百個細胞，形成囊胚。",
        mom: "可能會有些微出血，稱為著床性出血。",
        nutrition: "多吃富含蛋白質的食物。",
        exercise: "避免劇烈運動，保持溫和活動。"
    },
    {
        week: 4,
        trimester: "第一孕期",
        baby: "胚胎開始分化，神經管開始發育。",
        mom: "月經遲來，驗孕棒可能測出兩條線。",
        nutrition: "持續補充葉酸，多喝水。",
        exercise: "散步是最好的運動。"
    },
    {
        week: 5,
        trimester: "第一孕期",
        baby: "心臟開始跳動，雖然很微弱。",
        mom: "可能開始出現噁心、疲勞等早孕反應。",
        nutrition: "少量多餐，避免空腹。",
        exercise: "聽聽輕音樂，放鬆身心。"
    },
    {
        week: 6,
        trimester: "第一孕期",
        baby: "五官開始成形，手腳像小芽一樣長出。",
        mom: "孕吐可能加重，乳房變得敏感。",
        nutrition: "吃些蘇打餅乾緩解晨吐。",
        exercise: "避免過度勞累，多休息。"
    },
    {
        week: 7,
        trimester: "第一孕期",
        baby: "大腦發育迅速，每分鐘產生100個新細胞。",
        mom: "子宮變大，壓迫膀胱，頻尿現象明顯。",
        nutrition: "多吃富含維生素B6的食物。",
        exercise: "做些簡單的伸展運動。"
    },
    {
        week: 8,
        trimester: "第一孕期",
        baby: "手指和腳趾開始分化，不再是蹼狀。",
        mom: "腰圍可能稍微變粗，情緒波動較大。",
        nutrition: "補充鈣質，如牛奶、小魚乾。",
        exercise: "保持良好姿勢，預防腰酸。"
    },
    {
        week: 9,
        trimester: "第一孕期",
        baby: "肌肉開始發育，寶寶會動了（雖然妳感覺不到）。",
        mom: "荷爾蒙變化導致皮膚可能變差或變好。",
        nutrition: "多吃蔬菜水果，預防便秘。",
        exercise: "孕婦瑜伽是不錯的選擇。"
    },
    {
        week: 10,
        trimester: "第一孕期",
        baby: "重要器官已基本形成，進入胎兒期。",
        mom: "血流量增加，可能感到頭暈或心跳加速。",
        nutrition: "補充鐵質，如紅肉、菠菜。",
        exercise: "動作要輕柔，避免跌倒。"
    },
    {
        week: 11,
        trimester: "第一孕期",
        baby: "皮膚透明，可以看到血管，骨骼開始變硬。",
        mom: "早孕反應逐漸減輕，食慾開始恢復。",
        nutrition: "注意體重控制，不要暴飲暴食。",
        exercise: "游泳能減輕身體負擔。"
    },
    {
        week: 12,
        trimester: "第一孕期",
        baby: "手指甲和腳指甲開始生長。",
        mom: "子宮移出骨盆腔，小腹微凸。",
        nutrition: "攝取優質蛋白質，幫助寶寶生長。",
        exercise: "凱格爾運動有助於分娩。"
    },
    {
        week: 13,
        trimester: "第二孕期",
        baby: "聲帶開始形成，指紋也出現了。",
        mom: "進入舒適的第二孕期，精力恢復。",
        nutrition: "多吃含DHA的食物，如深海魚。",
        exercise: "可以適度增加運動強度。"
    },
    {
        week: 14,
        trimester: "第二孕期",
        baby: "臉部表情豐富，會皺眉、做鬼臉。",
        mom: "腹部隆起明顯，需要換穿孕婦裝。",
        nutrition: "補充纖維質，預防便秘。",
        exercise: "散步有助於消化和睡眠。"
    },
    {
        week: 15,
        trimester: "第二孕期",
        baby: "皮膚覆蓋胎毛，聽力開始發育。",
        mom: "可能出現妊娠紋，注意皮膚保濕。",
        nutrition: "補充維生素C，促進膠原蛋白生成。",
        exercise: "避免長時間站立。"
    },
    {
        week: 16,
        trimester: "第二孕期",
        baby: "腿比手長，關節活動靈活。",
        mom: "可能感覺到第一次胎動（胎動初覺）。",
        nutrition: "補充鋅，幫助細胞生長。",
        exercise: "保持規律作息。"
    },
    {
        week: 17,
        trimester: "第二孕期",
        baby: "皮下脂肪開始堆積，骨骼變硬。",
        mom: "重心改變，容易腰酸背痛。",
        nutrition: "多吃富含鈣質的食物。",
        exercise: "使用托腹帶減輕負擔。"
    },
    {
        week: 18,
        trimester: "第二孕期",
        baby: "聽覺更敏銳，能聽到媽媽的心跳聲。",
        mom: "胃口大開，注意飲食均衡。",
        nutrition: "控制澱粉攝取，避免血糖過高。",
        exercise: "睡前抬腿，預防靜脈曲張。"
    },
    {
        week: 19,
        trimester: "第二孕期",
        baby: "感官神經發育迅速，味覺、嗅覺形成。",
        mom: "乳暈顏色變深，可能出現妊娠黑線。",
        nutrition: "多吃富含維生素A的食物。",
        exercise: "注意室內空氣流通。"
    },
    {
        week: 20,
        trimester: "第二孕期",
        baby: "身長約25公分，可以進行詳細超音波檢查。",
        mom: "肚臍可能凸出，胎動更加頻繁。",
        nutrition: "補充鐵質，預防貧血。",
        exercise: "與寶寶說話，進行胎教。"
    },
    {
        week: 21,
        trimester: "第二孕期",
        baby: "消化系統發育，會吞嚥羊水。",
        mom: "下肢可能出現水腫。",
        nutrition: "少吃太鹹的食物，減少水腫。",
        exercise: "按摩腿部，促進血液循環。"
    },
    {
        week: 22,
        trimester: "第二孕期",
        baby: "眉毛、睫毛清晰可見。",
        mom: "可能出現假性宮縮，注意休息。",
        nutrition: "多吃富含鎂的食物，預防抽筋。",
        exercise: "動作放慢，避免跌倒。"
    },
    {
        week: 23,
        trimester: "第二孕期",
        baby: "肺部血管發育，練習呼吸動作。",
        mom: "體重增加較快，注意控制。",
        nutrition: "多吃粗糧，預防便秘。",
        exercise: "保持心情愉快。"
    },
    {
        week: 24,
        trimester: "第二孕期",
        baby: "內耳發育完成，平衡感建立。",
        mom: "需進行妊娠糖尿病篩檢。",
        nutrition: "控制糖分攝取。",
        exercise: "飯後散步有助降血糖。"
    },
    {
        week: 25,
        trimester: "第二孕期",
        baby: "皮膚微紅，皺褶多，開始長頭髮。",
        mom: "子宮壓迫胃部，容易胃食道逆流。",
        nutrition: "少量多餐，避免油膩。",
        exercise: "避免彎腰提重物。"
    },
    {
        week: 26,
        trimester: "第二孕期",
        baby: "眼睛能睜開，對光線有反應。",
        mom: "睡眠品質可能變差，試著側睡。",
        nutrition: "睡前喝杯熱牛奶。",
        exercise: "使用孕婦枕輔助睡眠。"
    },
    {
        week: 27,
        trimester: "第二孕期",
        baby: "大腦皮層發育，有規律的睡眠週期。",
        mom: "可能出現小腿抽筋。",
        nutrition: "多吃香蕉等富含鉀的食物。",
        exercise: "伸展小腿肌肉。"
    },
    {
        week: 28,
        trimester: "第三孕期",
        baby: "皮下脂肪增厚，體重增加迅速。",
        mom: "進入晚期，身體負擔加重。",
        nutrition: "增加蛋白質和鈣質攝取。",
        exercise: "注意胎動變化。"
    },
    {
        week: 29,
        trimester: "第三孕期",
        baby: "骨骼完全鈣化，需要大量鈣質。",
        mom: "可能出現呼吸急促，因自宮壓迫橫膈膜。",
        nutrition: "補充鈣片或牛奶。",
        exercise: "深呼吸練習。"
    },
    {
        week: 30,
        trimester: "第三孕期",
        baby: "大腦發育更複雜，頭部變大。",
        mom: "行動變得笨拙，注意安全。",
        nutrition: "多吃富含DHA的食物。",
        exercise: "避免去人多擁擠的地方。"
    },
    {
        week: 31,
        trimester: "第三孕期",
        baby: "生殖器官發育完成。",
        mom: "可能出現初乳分泌。",
        nutrition: "注意乳房護理。",
        exercise: "學習拉梅茲呼吸法。"
    },
    {
        week: 32,
        trimester: "第三孕期",
        baby: "胎位可能轉正（頭朝下）。",
        mom: "產檢次數增加，每兩週一次。",
        nutrition: "準備待產包。",
        exercise: "了解分娩徵兆。"
    },
    {
        week: 33,
        trimester: "第三孕期",
        baby: "羊水達到最高量，免疫系統發育。",
        mom: "可能出現水腫加重。",
        nutrition: "清淡飲食，低鹽低油。",
        exercise: "抬高雙腿休息。"
    },
    {
        week: 34,
        trimester: "第三孕期",
        baby: "中樞神經系統發育成熟。",
        mom: "骨盆腔關節鬆弛，恥骨疼痛。",
        nutrition: "多休息，減少走動。",
        exercise: "使用托腹帶。"
    },
    {
        week: 35,
        trimester: "第三孕期",
        baby: "肺部發育接近成熟。",
        mom: "頻尿更加嚴重，甚至漏尿。",
        nutrition: "睡前少喝水。",
        exercise: "多做凱格爾運動。"
    },
    {
        week: 36,
        trimester: "第三孕期",
        baby: "胎兒下降入盆，胃部壓迫感減輕。",
        mom: "每週進行一次產檢。",
        nutrition: "儲備體力，吃好消化食物。",
        exercise: "隨時準備待產。"
    },
    {
        week: 37,
        trimester: "第三孕期",
        baby: "已足月，隨時可能出生。",
        mom: "分泌物增加，注意清潔。",
        nutrition: "避免生冷食物。",
        exercise: "保持放鬆，等待產兆。"
    },
    {
        week: 38,
        trimester: "第三孕期",
        baby: "胎脂脫落，皮膚粉嫩。",
        mom: "可能感到焦慮和期待。",
        nutrition: "保持心情平靜。",
        exercise: "練習呼吸技巧。"
    },
    {
        week: 39,
        trimester: "第三孕期",
        baby: "所有器官發育成熟。",
        mom: "子宮頸開始軟化。",
        nutrition: "注意落紅、破水、陣痛。",
        exercise: "確認去醫院的交通方式。"
    },
    {
        week: 40,
        trimester: "第三孕期",
        baby: "預產期到了！",
        mom: "如果還沒動靜，多散步。",
        nutrition: "保持體力。",
        exercise: "放鬆心情，迎接寶寶。"
    }
];
