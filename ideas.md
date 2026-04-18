# QuizRipple：地球探險家 — 設計理念腦力激盪

## 設計方向 A：「地底寶藏地圖」冒險風格
<response>
<text>
**Design Movement**: 復古冒險地圖 × 現代扁平插畫（Retro Adventure Map × Modern Flat Illustration）

**Core Principles**:
1. 溫暖大地色系為底，以高飽和度的珠寶色（紅寶石、翡翠、藍寶石）作為點綴
2. 手繪感紋理疊加在圓潤幾何形狀上，製造「精心繪製的探險地圖」質感
3. 每個關卡如同地圖上的一個「探索標記」，視覺層次清晰
4. 動物角色以大頭比例（頭身比 3:1）呈現，強化可愛感

**Color Philosophy**:
- 主背景：溫暖奶油色 #FFF8E7（如羊皮紙）
- 地殼層：草綠 #6BBF59 / 泥土棕 #8B5E3C
- 地函層：橙紅 #E8763A / 熔岩橙 #FF6B35
- 地核層：深紅 #C0392B / 金黃 #F39C12
- 海洋藍：#2980B9 / 天空藍 #87CEEB
- 強調色：亮黃 #FFD700（星星、獎勵）

**Layout Paradigm**:
- 非對稱分層佈局：左側為動物角色展示區，右側為題目/內容區
- 底部為「地層剖面圖」裝飾條，視覺上呼應地球結構主題
- 關卡大廳採用「地圖標記卡片」排列，非傳統網格

**Signature Elements**:
1. 地層剖面裝飾邊框（頁面底部的波浪狀分層）
2. 手繪風格的星星、感嘆號、音效文字（轟隆隆！咻～）
3. 動物角色的「對話泡泡」設計，帶有鋸齒邊緣

**Interaction Philosophy**:
- 按鈕按下時有「彈跳」動畫（scale 0.95 → 1.05 → 1.0）
- 答題卡片懸停時輕微上浮（translateY -4px）
- 答對時動物角色執行「跳躍+旋轉」動畫

**Animation**:
- 頁面進入：動物角色從畫面外滑入（slideInFromBottom 0.5s ease-out）
- 計時器：圓形進度條，顏色從綠→黃→紅漸變
- 連擊達成：星星從動物角色位置爆炸散射
- 排行榜：狐獴群從底部依序彈出

**Typography System**:
- 標題：Nunito ExtraBold（圓潤感，兒童友善）
- 題目文字：Nunito Bold
- 說明文字：Nunito Regular
- 擬聲詞：Comic Neue Bold（手寫感）
</text>
<probability>0.08</probability>
</response>

## 設計方向 B：「彩虹地球儀」科普樂園風格（選定方向）
<response>
<text>
**Design Movement**: 現代兒童科普插畫 × 活潑扁平設計（Modern Edu-Illustration × Vibrant Flat Design）

**Core Principles**:
1. 高飽和度色彩搭配白色大量留白，製造「乾淨但充滿活力」的視覺感
2. 所有元素採用超大圓角（border-radius: 24-32px），無尖角設計
3. 動物角色以 SVG 插畫形式呈現，帶有柔和陰影與光暈效果
4. 資訊層次透過色塊背景區分，而非線條分隔

**Color Philosophy**:
- 主背景：天空漸層 #E8F4FD → #FFF9F0（白天探險感）
- 鼴鼠關卡主色：溫暖棕 #8B6914 / 土地橙 #D4873C
- 信天翁關卡主色：海洋藍 #1A6B9A / 天空青 #4ECDC4
- 動物冷知識主色：草地綠 #2ECC71 / 森林深綠 #1A7A4A
- 強調/互動色：活力黃 #FFD93D / 珊瑚紅 #FF6B6B
- 連擊/獎勵色：金色漸層 #FFD700 → #FFA500

**Layout Paradigm**:
- 全螢幕沉浸式遊戲佈局，每個畫面獨立填滿視窗
- 動物角色固定在畫面左下角或右下角，作為「常駐嚮導」
- 題目卡片採用「浮島」設計，帶有輕微投影，懸浮在漸層背景上

**Signature Elements**:
1. 動物角色的「情緒泡泡」（答對=星星眼、緊張=汗珠、答錯=問號）
2. 地球剖面圖作為背景裝飾元素，以半透明方式呈現
3. 擬聲詞以「爆炸字體」形式出現（傾斜、加粗、帶有描邊）

**Interaction Philosophy**:
- 每次點擊答案時，按鈕有「果凍彈跳」效果
- 正確答案：綠色光暈擴散 + 動物跳躍
- 錯誤答案：紅色震動 + 動物搖頭
- 計時器快結束時：整個畫面輕微脈動

**Animation**:
- 關卡選擇：卡片從中心縮放進入（scale 0 → 1.1 → 1.0，stagger 0.1s）
- 答題：題目卡片從右側滑入
- 連擊：動物角色旋轉一圈，星星軌跡環繞
- 排行榜：狐獴群以波浪方式依序出現

**Typography System**:
- 標題/關卡名：Nunito ExtraBold 900（超粗圓潤）
- 題目文字：Nunito Bold 700
- 選項文字：Nunito SemiBold 600
- 擬聲詞/強調：Nunito Black 900 + 傾斜
- 說明/副文字：Nunito Regular 400
</text>
<probability>0.07</probability>
</response>

## 設計方向 C：「夜光地球」神秘科幻風格
<response>
<text>
**Design Movement**: 深色宇宙科幻 × 霓虹發光（Dark Space Sci-Fi × Neon Glow）

**Core Principles**:
1. 深色背景（深藍/深紫）搭配霓虹色發光效果，製造「夜晚探索地球」的神秘感
2. 動物角色以「全息投影」風格呈現，帶有掃描線效果
3. 數據視覺化風格的計時器與分數顯示
4. 地球剖面以「X光掃描」風格呈現

**Color Philosophy**:
- 主背景：深宇宙藍 #0A0E27 / 深紫 #1A0533
- 霓虹主色：電藍 #00D4FF / 霓虹綠 #39FF14
- 地核發光：熔岩橙 #FF6B00 / 電漿紅 #FF0040
- 動物角色：白色輪廓 + 彩色發光邊緣

**Layout Paradigm**:
- 中央圓形地球儀作為主視覺，各關卡從地球表面「鑽入」
- HUD（抬頭顯示器）風格的分數與計時器
- 六邊形蜂巢格局的選項按鈕

**Signature Elements**:
1. 掃描線效果疊加在所有卡片上
2. 發光邊框（box-shadow: 0 0 20px neon-color）
3. 數字計分器以「數位顯示字體」呈現

**Interaction Philosophy**:
- 按鈕懸停時發光強度增加
- 答對時電流閃爍效果
- 連擊時畫面邊緣出現電弧

**Animation**:
- 頁面載入：從黑暗中逐漸「掃描」出現
- 答題：選項以閃爍方式出現
- 連擊：電流在動物角色周圍跳躍

**Typography System**:
- 標題：Orbitron（科幻感等寬字體）
- 內容：Share Tech Mono（等寬科技感）
- 強調：Orbitron Bold
</text>
<probability>0.05</probability>
</response>

---

## 選定方向：B「彩虹地球儀」科普樂園風格

選擇理由：最符合 6-10 歲兒童的視覺偏好，高飽和度色彩與圓潤設計能降低視覺壓力，同時保持足夠的活力感。Nunito 字體的圓潤特性完美契合「無尖角」的設計規範。
