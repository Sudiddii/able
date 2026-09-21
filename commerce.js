const GROUP_TO_BOTTLENECKS = {
    'Manufacturing': ['Supplier documents', 'Product development', 'Sample library', 'Buyer materials'],
    'Trade & Distribution': ['RFQ & quotation', 'Supplier coordination', 'Sample tracking', 'Buyer follow-up'],
    'Marketplace': ['Product research', 'Listing operations', 'Ads and inventory', 'Performance reporting'],
    'Independent Ecommerce': ['Commerce operating layer', 'Content production', 'AI search visibility', 'Sales and service']
  };
const DIAGNOSTICS = {
    'Supplier documents': { today: 'Staff manually read, translate and re-type supplier PDFs and spec sheets.', automate: 'Extraction, translation drafts, structuring', human: 'Sign-off on price and spec accuracy', outcome: 'Fewer manual re-entries per file' },
    'Product development': { today: 'Concept and sample status lives across chats and photos.', automate: 'Status tracking, sample library, buyer material drafts', human: 'Design and sample approval', outcome: 'One shared status view per concept' },
    'Sample library': { today: 'Sample versions and approval status are tracked across photos, spreadsheets and chat threads.', automate: 'Central sample record, version history, status updates', human: 'Approval of which sample becomes production-ready', outcome: 'One current sample status per concept, not several' },
    'Buyer materials': { today: 'Buyer PDFs and catalogues are rebuilt manually for each enquiry.', automate: 'First-draft buyer PDFs, spec sheets and pricing tables from approved product data', human: 'Approval before anything is sent to a buyer', outcome: 'Faster turnaround from approved sample to buyer-ready material' },
    'RFQ & quotation': { today: 'Quotes are built manually from supplier pricing, specs and margin rules for every enquiry.', automate: 'Draft quotes, pricing calculations, template formatting', human: 'Final price and terms approval', outcome: 'Faster quote turnaround per RFQ' },
    'Supplier coordination': { today: 'Supplier updates on cost, MOQ and lead time arrive by chat and email and get re-typed into internal records.', automate: 'Structuring supplier updates, flagging changes, updating internal records', human: 'Decisions on supplier changes that affect price or delivery', outcome: 'Fewer missed supplier changes' },
    'Sample tracking': { today: 'Sample requests, shipping status and buyer feedback are tracked in separate threads.', automate: 'Status tracking, reminders, consolidated sample record', human: 'Approval of which sample proceeds', outcome: 'One tracked status per sample request' },
    'Buyer follow-up': { today: 'Sales tracks who to follow up with from memory or a spreadsheet.', automate: 'Reminders, drafts, CRM logging', human: 'Sending the follow-up, pricing decisions', outcome: 'No follow-up missed without a decision to skip it' },
    'Product research': { today: 'Competitive and trend research is done manually across marketplaces and spreadsheets.', automate: 'Structuring listings, price and trend data into a comparable view', human: 'Deciding which products or changes to pursue', outcome: 'Faster, more consistent research per category' },
    'Listing operations': { today: 'Listings are drafted, formatted and updated one at a time per channel.', automate: 'First-draft copy, resizing, multi-channel formatting', human: 'Final approval before publishing', outcome: 'More channel-ready drafts per SKU' },
    'Ads and inventory': { today: 'Ad spend and inventory levels are checked and adjusted manually across channels.', automate: 'Status checks, exception flags, routine adjustments within set rules', human: 'Approval of budget changes and inventory exceptions', outcome: 'Fewer manual cross-checks per week' },
    'Performance reporting': { today: 'Weekly performance numbers are pulled manually from multiple dashboards into one report.', automate: 'Data consolidation, formatting, scheduled reporting', human: 'Interpreting results and deciding next actions', outcome: 'One consistent report without manual assembly' },
    'Commerce operating layer': { today: 'Product, order and support data live in separate tools with no shared view.', automate: 'Status checks, exception flags, routine updates across systems', human: 'Handling flagged exceptions', outcome: 'Fewer manual cross-checks per week' },
    'Content production': { today: 'Scripts, images and video are produced manually at a pace that can\u2019t match the publishing schedule.', automate: 'Draft scripts, image and video generation', human: 'Review before every publish', outcome: 'More published pieces without adding headcount' },
    'AI search visibility': { today: 'The team can\u2019t see why competitors appear more often in AI and search answers.', automate: 'Structuring search and citation signals into a prioritised gap list', human: 'Deciding which content actions to pursue', outcome: 'A clear, prioritised visibility action list' },
    'Sales and service': { today: 'The same product and order questions are answered manually, again and again.', automate: 'First response, qualification, routine answers', human: 'Anything outside routine or high-value', outcome: 'Faster first response on routine questions' }
  };
const PARAM_TO_GROUP = { 'manufacturer-factory': 'Manufacturing', 'trade-distribution': 'Trade & Distribution', 'marketplace-seller': 'Marketplace', 'ecommerce-brand': 'Independent Ecommerce' };
const BIZ_GROUP_PARAM = { 'Manufacturing': 'manufacturer-factory', 'Trade & Distribution': 'trade-distribution', 'Marketplace': 'marketplace-seller', 'Independent Ecommerce': 'ecommerce-brand' };
const SOLUTION_PARAM_CONFIG = {
    'manufacturing-automation': { eyebrow: 'For manufacturers', supporting: 'We connect supplier files, product development and buyer materials into human-approved systems — without replacing the tools your team already uses.', bizGroup: 'Manufacturing', bottleneck: 'Supplier documents' },
    'trade-operations': { eyebrow: 'For trading companies', supporting: 'We connect RFQs, supplier coordination and buyer follow-up into human-approved systems — without replacing the tools your team already uses.', bizGroup: 'Trade & Distribution', bottleneck: 'Buyer follow-up' },
    'product-development': { eyebrow: 'Product development', supporting: 'We connect concept, sample and buyer material workflows into human-approved systems — without replacing the tools your team already uses.', bizGroup: 'Manufacturing', bottleneck: 'Product development' },
    'supplier-document-automation': { eyebrow: 'Supplier documents', supporting: 'We connect supplier files, translation and reporting into human-approved systems — without replacing the tools your team already uses.', bizGroup: 'Manufacturing', bottleneck: 'Supplier documents' },
    'ecommerce-operations': { eyebrow: 'For ecommerce teams', supporting: 'We connect product, content, growth and support into human-approved systems — without replacing the tools your team already uses.', bizGroup: 'Independent Ecommerce', bottleneck: 'Commerce operating layer' },
    'ai-sales-service': { eyebrow: 'Sales & service', supporting: 'We connect enquiries, qualification and CRM into human-approved systems — without replacing the tools your team already uses.', bizGroup: 'Independent Ecommerce', bottleneck: 'Sales and service' },
    'ai-search-visibility': { eyebrow: 'AI search visibility', supporting: 'We connect search and citation signals into a prioritised, human-approved action list — without replacing the tools your team already uses.', bizGroup: 'Independent Ecommerce', bottleneck: 'AI search visibility' }
  };
const form = document.getElementById('workflow-form');
const operation = document.getElementById('operation');
const picker = document.getElementById('workflow-picker');
const workflow = document.getElementById('brief-workflow');
const interest = document.getElementById('area-interest');
const business = document.getElementById('business-type');
const draftKey = 'wayfound_workflow_brief_v2';
const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
const params = new URLSearchParams(location.search);
const solution = SOLUTION_PARAM_CONFIG[params.get('solution')];
operation.value = solution?.bizGroup || PARAM_TO_GROUP[params.get('role')] || 'Manufacturing';
GROUP_TO_BOTTLENECKS.Manufacturing.push('AI engineering workstation', 'Video marketing');
GROUP_TO_BOTTLENECKS['Independent Ecommerce'].push('Video marketing');
DIAGNOSTICS['AI engineering workstation'] = {today:'Engineering changes require a review across models, drawings and project records.',automate:'Change proposals, impact summaries and revision tracking',human:'Engineering validation and release',outcome:'A reviewable proposal with affected records'};
DIAGNOSTICS['Video marketing'] = {today:'Product footage is edited and uploaded separately for each campaign.',automate:'Reference shot breakdown, AI-assisted edits, subtitles and scheduled distribution',human:'Shot plan, final content and publishing authorisation',outcome:'Reusable product videos and a connected distribution workflow'};
DIAGNOSTICS['Product development'].automate = 'Concept variations, 3D / sample records and buyer material drafts';
DIAGNOSTICS['Buyer follow-up'].outcome = 'A tracked follow-up queue with review points';
function fillPicker(preferred) {
  picker.replaceChildren(...GROUP_TO_BOTTLENECKS[operation.value].map(value => new Option(value,value)));
  if (preferred && GROUP_TO_BOTTLENECKS[operation.value].includes(preferred)) picker.value = preferred;
  describeWorkflow();
}
function describeWorkflow() {
  const d = DIAGNOSTICS[picker.value];
  const box = document.getElementById('workflow-description'); box.replaceChildren();
  for (const [label,content] of [['Today',d.today],['The system helps with',d.automate],['People approve',d.human],['First useful output',d.outcome]]) {
    const p = document.createElement('p'), title = document.createElement('strong');title.textContent = label + ': ';p.append(title,document.createTextNode(content));box.append(p);
  }
}
function estimateWorkload() {
  const [frequency,people,minutes] = ['frequency','people','minutes'].map(id => Math.max(0,Number(document.getElementById(id).value)||0));
  document.getElementById('estimate').textContent = (frequency*4.33*people*minutes/60).toFixed(1);
}
operation.addEventListener('change', () => {
  fillPicker(); const url = new URL(location.href);url.searchParams.set('role',BIZ_GROUP_PARAM[operation.value]);url.searchParams.delete('solution');history.replaceState({},'',url);
});
picker.addEventListener('change',describeWorkflow);
['frequency','people','minutes'].forEach(id => document.getElementById(id).addEventListener('input',estimateWorkload));
fillPicker(solution?.bottleneck);estimateWorkload();
if(solution){document.getElementById('diagnostic').open=true;}
try { const saved=JSON.parse(localStorage.getItem(draftKey)||'null'); if(saved && typeof saved==='object') for(const [name,value] of Object.entries(saved)){const field=form.elements.namedItem(name);if(field && typeof value==='string')field.value=value;} } catch {}
function saveDraft(){try{localStorage.setItem(draftKey,JSON.stringify(Object.fromEntries(new FormData(form))));}catch{}}
form.addEventListener('input',saveDraft);form.addEventListener('change',saveDraft);
function chooseWorkflow(topic,description) {
  workflow.value = topic;
  interest.value = /video|content|marketing/i.test(topic) ? 'Product video marketing' : /product development|sample|buyer materials/i.test(topic) ? 'AI design & product development' : /factory|supplier|quotation|follow-up|coordination|reporting/i.test(topic) ? 'Factory & trade automation' : 'Other software development';
  if(description) document.getElementById('brief-today').value = description;
  saveDraft();document.getElementById('contact').scrollIntoView({behavior:motion()});workflow.focus({preventScroll:true});
}
document.querySelectorAll('[data-workflow]').forEach(button=>button.addEventListener('click',()=>chooseWorkflow(button.dataset.workflow)));
document.getElementById('use-workflow').addEventListener('click',()=>{business.value=operation.value;chooseWorkflow(picker.value,DIAGNOSTICS[picker.value].today);});
form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data = new FormData(form);
  const text = ['WAYFOUND / COMMERCE AI WORKFLOW BRIEF','',...Array.from(data.entries()).map(([key,value])=>`${key.toUpperCase()}: ${value}`),'','Prepared locally. This brief has not been sent to Wayfound.'].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='wayfound-workflow-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  document.getElementById('workflow-status').textContent='Your workflow brief is ready for download. It has not been sent to Wayfound.';
});
