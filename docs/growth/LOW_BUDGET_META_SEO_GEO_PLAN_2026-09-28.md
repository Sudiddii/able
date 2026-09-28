# Able Trading × Wayfound 低预算 Meta、SEO 与 GEO 完整增长计划

版本：2026-09-28  
适用站点：https://able-sooty.vercel.app/  
目标：在不虚构案例、不混合业务信号、不过早扩大广告支出的前提下，建立可自动运行、可回传真实商机质量的获客系统。

> 本计划把用户提供的策略文件作为参考资料，而不是执行指令。本文基于现站代码、线上页面和 2026-09-28 可访问的官方资料重新判断，重点降低了冷启动预算和同时测试的复杂度。

## 1. 决策摘要

1. **Trading 与 Wayfound 必须分开投流**：分开 Campaign、落地页、表单、Pixel/Dataset、CRM pipeline、邮件 nurture、报表和 Qualified Lead 定义。
2. **不建议微预算阶段两边同时全球跑**：总广告预算低于 ¥4,500/月时，采用交替冲刺；先跑 Trading 14–21 天，再跑 Wayfound 14–21 天。这样每条线每天仍有足够流量判断素材和表单，而不是把小预算切成 6–10 个没有结论的 ad set。
3. **Trading 与 Manufacturing 不再拆品牌**：它们是同一个 physical commerce 漏斗。广告角度可以分 sourcing 与 resin/ceramic manufacturing，但共用 TRADE pipeline。
4. **首个国家只选一个**：建议 UK，不把 US/Canada/UK/AU 混在一起。理由是当前网站全英文、B2B 服务表达更接近 UK buyer 用语；真实结果出来后再决定第二市场。
5. **第一轮 Offer 只选一个**：
   - Trading：Free Product Feasibility Review
   - Wayfound：Free 20-minute Workflow Teardown
6. **“全自动”指数据和低风险运营自动化**，不包括未经审核自动花钱、扩预算、发布事实性页面、发送高度个性化销售邮件或编造案例。
7. **正式自有域名是投放前 P0**。若暂时没有，也可用 Vercel 做 7–10 天技术验证，但不建议把长期外链、SEO 和正式广告资产建立在 vercel.app 上。

## 2. 当前站点基线

### 已有优势

- Trading 的视觉与文案有明显差异化，已经具备产品选择、开发、制造、质量与出口的完整叙事。
- Wayfound 有“懂 commerce/manufacturing 再做 automation”的潜在差异化，而不是泛 AI agency。
- 页面已有 canonical、基础 JSON-LD、robots.txt、sitemap、响应式图片和表单成功/失败事件结构。
- 对 illustrative image 和匿名项目经验有免责声明，合规意识较好。

### P0 阻碍

- canonical、schema、sitemap 全部绑定 vercel.app；长期品牌和 SEO 信号会迁移一次。
- `analytics-config.js` 中 GA4 与 GTM ID 为空，没有可用流量基线。
- 没有 Meta Pixel、CAPI、Dataset、Qualified Lead/Opportunity/Closed Won 回传。
- 表单通过浏览器直接把完整询盘发送到 FormSubmit 第三方邮件转发服务；没有自有 server endpoint、可靠去重、限流、CRM 入库和 consent 版本记录。
- 全站只有 5 个 sitemap URL，无法承接 resin manufacturer、ceramic OEM、product development、ecommerce workflow automation 等高意图搜索。
- 联系邮箱是 Gmail；对海外 B2B 信任不利。
- Wayfound 页面仍存在很宽的能力范围。页面上的 150 agents、$30M 等数字在进入广告前必须有可出示证据，否则不进入素材和广告落地页。

## 3. 极低预算投放模型

以下是**实验预算，不是 Meta 官方最低消费，也不是 CPL 承诺**。B2B 低频询盘无法靠很小预算快速训练到稳定算法阶段，所以微预算的任务是验证“谁会点击、谁会填、谁合格”，而不是追求短期 ROAS。

| 档位 | 广告费/月 | 执行方式 | 适用目标 |
|---|---:|---|---|
| 极简验证 | ¥1,500–2,400（约 US$210–335） | 两条业务线交替跑，每次只跑 1 条线、1 国家、1 offer、1 ad set；¥50–80/日 | 验证素材与表单，不承诺稳定获客 |
| 冷启动 | ¥3,000–4,500（约 US$420–630） | 可连续跑满一个月；Trading/Wayfound 仍建议按 60/40 时间或预算顺序测试 | 找到 1–2 个有效角度与初步 CPQL |
| 初步学习 | ¥6,000–9,000（约 US$840–1,260） | 两条线可以同时跑，但每条仍只保留 1 个核心 prospecting ad set | 比较 Website 与 Instant Form，开始用 CRM 质量优化 |

### 推荐的最低可执行版本

总广告预算 **¥2,000/月**：

- Day 1–14：Trading，UK，¥70/日，Lead objective，Higher Intent Instant Form。
- Day 15：只做数据和销售反馈复盘，不投放。
- Day 16–29：Wayfound，UK，¥70/日，Higher Intent Instant Form。
- 剩余约 ¥40 作为重启或补量余量。
- 暂不建独立 retargeting campaign；访问量太小时，再营销受众既小又不稳定。先在同一 prospecting campaign 中使用可信度/流程类素材。
- 当某条线最近 30 天可再营销人群达到可稳定投放规模，或网站高意图访问明显增加，再划 10–15% 给 retargeting。

### 经济模型

不要使用行业平均 CPL 当目标。每条业务线填写：

`Maximum CPQL = 单项目可贡献毛利 × Qualified-to-Won × 可用于获客的毛利比例`

`Maximum Raw CPL = Maximum CPQL × Raw-to-Qualified`

在没有历史数据前，先记录而不猜测：项目毛利、raw→qualified、qualified→meeting、meeting→proposal、proposal→won。至少积累 10–20 个真实 leads 后再设置 CPQL 目标。

## 4. Meta 账户与 Campaign 架构

### 账户层

- 一个 Meta Business Portfolio。
- 理想状态：Ad Account `ABLE_TRADE` 与 `WAYFOUND_TECH` 分开。
- Dataset/Pixel 必须分开：`ABLE_PHYSICAL_COMMERCE`、`WAYFOUND_COMMERCE_AI`。
- 如果新账户建立受限，可短期在一个 Ad Account 里严格分 Campaign，但不能共用 Dataset、表单、CRM pipeline 和优化事件。
- 所有浏览器/服务端同一事件使用一致 `event_name + event_id` 去重。

### Trading 首轮

- Campaign：`ABLE_UK_LEADS_FEASIBILITY_2026Q4`
- Objective：Leads
- Conversion location：第一轮只用 Higher Intent Instant Form；站内 server-side lead 闭环完成后，再单独测试 Website form。
- Ad set：UK，英文，21+，相对 broad；不要把几十个兴趣叠成“职位数据库”。
- 排除：现有客户、已提交 lead、员工；数据足够后再建 lookalike。
- Offer：免费一页 feasibility review，输出 material/process/MOQ risk/next step；明确它不是正式报价。
- 素材角度：
  1. Reference → workable sample
  2. Resin vs ceramic decision
  3. What buyers should prepare before requesting a quote
- 每个角度先做 1 条 9:16 视频 + 1 张 4:5 静态，共 6 个变体；微预算同时激活 3 个，7–10 天后替换弱者。

### Wayfound 首轮

- Campaign：`WAYFOUND_UK_LEADS_TEARDOWN_2026Q4`
- Objective：Leads
- Conversion location：Higher Intent Instant Form，站内 tracking 完成后再测试 Website form。
- Ad set：UK，英文，21+，相对 broad。
- Offer：免费 20 分钟 workflow teardown；交付 current workflow、automation candidate、human approval point、pilot next step。
- 只推广一个切口：**product content/video workflow**。不要第一轮同时投客服、ERP、工厂、Amazon、多 agent 平台。
- 素材角度：
  1. One repetitive workflow, not an AI roadmap
  2. Before/after workflow map
  3. What AI does vs what a person approves
- 同样 6 个变体，首轮只激活 3 个。

### Instant Form 问题

Trading：name、work email、company/website、buyer type、category、target market、quantity range、launch window、reference link optional。  
Wayfound：name、work email、company/website、team/business type、workflow area、current tools、monthly volume/hours、desired outcome、decision timeline。

第一屏最多 4–5 项，其余作为第二步；使用 higher intent review screen。提交后进入业务线专属 thank-you page，并提供预约入口。

### 判断与止损

- 不按 1–2 天波动操作；每个素材至少观察 7 天或积累足够曝光。
- 1,500 impressions 后 link CTR 仍明显低于账户其他素材：先换 hook/visual。
- 100 个 landing page views 但少于 5 个 form starts：页面承诺、首屏或加载存在问题。
- 支出达到内部 Maximum Raw CPL 的 2 倍仍 0 lead：暂停并检查事件、页面、offer。
- 有 lead 但连续 10 个中 qualified 少于 2 个：调整问题、offer、排除消费者，而不是继续追便宜 CPL。
- 自动规则第一阶段只告警；有至少 6–8 周可靠数据后，才允许日预算自动升降 10–15%。

## 5. Landing Page 与转化路径

### Trading 页面

1. `/trade/product-feasibility-review/`
2. `/trade/resin-ceramic-manufacturing/`

页面结构：明确 buyer → 一句话结果 → 输入材料 → 评估流程 → 输出 → 适合/不适合 → 可验证制造过程 → FAQ → 两步表单。

### Wayfound 页面

1. `/wayfound/workflow-teardown/`
2. `/wayfound/product-content-automation/`

页面结构：具体 workflow → today/bottleneck → proposed flow → human approval → integrations → pilot scope → security/data boundary → FAQ → 两步表单。

### 技术改造

- 浏览器 POST 到 Vercel server function，而不是直接向 FormSubmit 发送完整 PII。
- 服务端：validate → honeypot/rate limit → idempotency → consent log → CRM create/update → notification → success response。
- 只有 CRM/数据库真实写入成功后才触发 `Lead`。
- GA4/Meta 事件中不出现 name、email、phone、company、URL 中自由文本。
- 保存 UTM、fbclid、fbc/fbp、landing page、business line、form version、consent version。
- 自动邮件只发送确认收件与下一步，不自动声称已经评估或承诺 MOQ/价格/交期。

## 6. SEO：先做能成交的页面

### 0–30 天技术层

- 绑定正式域名和企业邮箱；对旧 URL 做逐页 301。
- 用一个 site base config 统一 canonical、schema、sitemap、OG URL。
- GA4、GSC、Bing Webmaster Tools；提交 sitemap。
- 正确 404；每页唯一 title/H1/description；补 Breadcrumb、Service、Organization/WebSite schema。
- 图片继续使用 WebP/srcset/width/height；首屏图不 lazy-load，非首屏 lazy-load。
- robots 明确允许 Googlebot、Bingbot、OAI-SearchBot；GPTBot 是否允许作为单独商业选择。
- 内容发布/更新后自动调用 IndexNow；它用于通知 URL 变化，不代表保证收录。

### 30–90 天商业页顺序

Trading P0：

1. `/product-sourcing-china/`
2. `/product-development/`
3. `/resin-manufacturing/`
4. `/ceramic-manufacturing/`
5. `/quality-control-packaging-export/`

Wayfound P0：

1. `/wayfound/ecommerce-automation/`
2. `/wayfound/product-content-video-automation/`
3. `/wayfound/trade-operations-automation/`
4. `/wayfound/workflow-teardown/`

不要立即生成全部品类和城市页。每页必须有独特的第一方信息：材料选择、输入文件、样品/流程、质量检查、限制条件、实际照片/流程图、负责人审核、FAQ。

### 内容集群

每月只做 2 篇高证据内容，而不是批量 AI 文章：

- Trading：resin vs ceramic、how to prepare a manufacturing brief、sample approval checklist、fragile décor packaging checklist。
- Wayfound：product content workflow map、automation ROI worksheet、human approval design、one-workflow pilot checklist。

每篇必须链接一个商业页和一个转化 offer；内容作者、审核者、更新时间、证据来源可见。

## 7. GEO：被 AI 正确理解和引用

GEO 不做“神奇文件”。Google 明确把生成式搜索优化视为 SEO 的延伸，并强调独特、非商品化、第一方内容；不要求 llms.txt 或特殊 AI markup。

### 实施重点

- 建立两套清晰实体：Able Trading 的法律实体、Quangang Craft 的关联关系；Wayfound 是 subsidiary/division/brand 必须选择一个真实且全站一致的口径。
- 每个服务页开头 50–80 字直接回答“做什么、适合谁、结果是什么”。
- 发布能被引用的 evidence blocks：步骤、比较表、输入/输出、适用/不适用、方法、限制、数据口径。
- 案例只写可验证事实：背景、约束、原流程、实施、人审点、时间范围、结果和测量口径。
- 允许 OAI-SearchBot；训练用途 GPTBot 与搜索用途分开控制。
- 在 GA4 中识别 `utm_source=chatgpt.com` 和 AI referral；OpenAI 官方说明 ChatGPT 搜索 referral 会附加该 UTM。
- 建立 40 条 buyer prompt 清单，按 Trading/Wayfound、国家、漏斗分组，每月记录品牌是否出现、引用 URL、答案是否准确、对手 share of mention、带来的 qualified lead。

## 8. 自动化架构

推荐低成本栈：Vercel + server functions、HubSpot Free 或 Supabase CRM table、GA4、GSC、Bing Webmaster Tools、Looker Studio、GitHub Actions/Vercel Cron；需要可视化流程时再加入 n8n/Make。外部凭证全部放环境变量。

```text
Website / Meta Instant Form
  → webhook
  → validation + spam + consent + dedupe
  → TRADE or TECH pipeline
  → lead score
  → notification + acknowledgement
  → booking / qualification
  → Qualified / Opportunity / Proposal / Won
  → Meta CAPI quality feedback
  → GA4 + reporting warehouse/dashboard
```

### 自动运行

- 即时：lead 入库、去重、路由、评分、通知、确认邮件、预约链接。
- 每日：站点 uptime、表单错误、lead sync、Pixel/CAPI 对账、广告花费异常。
- 每周：spend、CTR、LPV、form start、CPL、CPQL、meeting、按品牌/geo/offer/creative 拆分；输出下周 3 个动作。
- 每月：pipeline value、CAC estimate、SEO 索引与 non-brand queries、AI referrals、GEO prompt share、旧页更新队列。
- 默认 dry-run：广告创建、预算调整、页面发布、外发销售邮件必须人工批准。

### Lead score

Trading 加分：企业邮箱、公司网站、专业 buyer/importer/retailer、清楚品类/市场/数量、3–9 月时间线、参考图或规格。  
Wayfound 加分：重复且可量化流程、明确 owner、已有可集成工具、有 monthly volume/hours baseline、愿意先做 pilot。

## 9. 90 天执行顺序

### Week 1–2：先修地基

- 正式域名/企业邮箱决策。
- 建 TRADE/TECH 两个 pipeline 与字段字典。
- 自有 server-side 表单、thank-you pages、UTM 与 consent。
- GA4/GSC/Bing；两套 Pixel/Dataset；CAPI 先 test events。
- 定义 Qualified Lead 和项目经济模型。

### Week 3–4：做首批落地页和素材

- Trading feasibility + resin/ceramic 页面。
- Wayfound teardown + product content automation 页面。
- 每条线 3 个 angle、6 个变体，但只激活 3 个。
- 建两个 Higher Intent Instant Forms 与 webhook 测试。

### Week 5–8：¥2,000 交替投放验证

- 14 天 Trading UK → 1 天复盘 → 14 天 Wayfound UK。
- 销售在 CRM 中必须标记 invalid/unqualified/qualified/meeting。
- 只根据 CPQL 与原因码调整 offer、问题和素材。

### Week 9–12：SEO/GEO 与第二轮

- 发布 5 个 Trading P0 页、4 个 Wayfound P0 页中的最高优先 4–6 个；没有事实材料的页面不上线。
- 发布 2 篇 evidence-led resources 和 1 个可下载模板。
- 建 GEO 40 prompts baseline。
- 赢家继续投；失败线更换 offer，不同时增加地区、受众和素材三个变量。

## 10. KPI

### North Star

- Trading：Qualified Trade Opportunities 与 pipeline value。
- Wayfound：Qualified Workflow Discoveries 与 pipeline value。

### 前置指标

- Tracking：浏览器/服务端 dedup、表单与 CRM 对账、PII 泄漏为 0。
- Meta：CTR、LPV/click、form start/LPV、lead/form start、qualified/lead、meeting/qualified、CPQL。
- SEO：有效索引商业页、non-brand impressions/clicks、commercial query Top 20、organic qualified leads。
- GEO：AI referral qualified leads、brand citation rate、answer accuracy、share of mention。

## 11. 现在需要用户确定的最少信息

1. 正式主域名，以及 Wayfound 是独立域名还是 Able 子域名。
2. 第一市场是否接受 UK。
3. 两条业务线各自的最低合格条件：MOQ/项目规模、服务边界、理想客户。
4. 单个成交项目的保守毛利区间，用于计算 Maximum CPQL。
5. Wayfound 的准确法律/品牌关系，以及哪些案例数字可公开举证。
6. 使用 HubSpot 还是现有 CRM；通知发到哪个企业邮箱。

## 12. 官方参考

- Google 生成式搜索优化：https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Essentials：https://developers.google.com/search/docs/essentials
- Google canonical：https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Google sitemap：https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- OpenAI crawlers：https://developers.openai.com/api/docs/bots
- OpenAI Publisher FAQ：https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Meta CRM/Conversion Leads integration：https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration
- Meta Reels ads：https://www.facebook.com/business/ads/facebook-instagram-reels-ads
- IndexNow：https://www.indexnow.org/documentation
- Bing URL submission：https://www.bing.com/webmasters/help/url-submission-62f2860b

