const EventGenerator = {
    commonEvents: [
        {
            category: 'Sales',
            events: [
                { publisher: 'Codeunit "Sales-Post"', event: 'OnBeforePostSalesDoc', params: 'var SalesHeader: Record "Sales Header"; CommitIsSuppressed: Boolean; PreviewMode: Boolean; var HideProgressWindow: Boolean; var IsHandled: Boolean' },
                { publisher: 'Codeunit "Sales-Post"', event: 'OnAfterPostSalesDoc', params: 'var SalesHeader: Record "Sales Header"; var SalesShipmentHeader: Record "Sales Shipment Header"; var SalesInvoiceHeader: Record "Sales Invoice Header"; var SalesCrMemoHeader: Record "Sales Cr.Memo Header"; CommitIsSuppressed: Boolean; InvtPickPutaway: Boolean; var GenJnlPostLine: Codeunit "Gen. Jnl.-Post Line"; var ItemJnlPostLine: Codeunit "Item Jnl.-Post Line"' },
                { publisher: 'Codeunit "Sales-Post"', event: 'OnBeforeSalesLineModify', params: 'var SalesLine: Record "Sales Line"; var IsHandled: Boolean' },
                { publisher: 'Table "Sales Header"', event: 'OnAfterValidateEvent (Status)', params: 'var Rec: Record "Sales Header"; var xRec: Record "Sales Header"; CurrFieldNo: Integer' },
                { publisher: 'Codeunit "Release Sales Document"', event: 'OnBeforeReleaseSalesDoc', params: 'var SalesHeader: Record "Sales Header"; PreviewMode: Boolean; var IsHandled: Boolean' },
            ]
        },
        {
            category: 'Purchase',
            events: [
                { publisher: 'Codeunit "Purch.-Post"', event: 'OnBeforePostPurchaseDoc', params: 'var PurchaseHeader: Record "Purchase Header"; PreviewMode: Boolean; CommitIsSupressed: Boolean; var HideProgressWindow: Boolean; var ItemJnlPostLine: Codeunit "Item Jnl.-Post Line"; var IsHandled: Boolean' },
                { publisher: 'Codeunit "Purch.-Post"', event: 'OnAfterPostPurchaseDoc', params: 'var PurchaseHeader: Record "Purchase Header"; var GenJnlPostLine: Codeunit "Gen. Jnl.-Post Line"; PurchRcpHdrNo: Code[20]; RetShptHdrNo: Code[20]; PurchInvHdrNo: Code[20]; PurchCrMemoHdrNo: Code[20]' },
                { publisher: 'Codeunit "Release Purchase Document"', event: 'OnBeforeReleasePurchaseDoc', params: 'var PurchaseHeader: Record "Purchase Header"; PreviewMode: Boolean; var IsHandled: Boolean' },
            ]
        },
        {
            category: 'General Journal',
            events: [
                { publisher: 'Codeunit "Gen. Jnl.-Post Line"', event: 'OnBeforePostGenJnlLine', params: 'var GenJournalLine: Record "Gen. Journal Line"; CommitIsSuppressed: Boolean; var Posted: Boolean; var GenJnlPostLine: Codeunit "Gen. Jnl.-Post Line"' },
                { publisher: 'Codeunit "Gen. Jnl.-Post Line"', event: 'OnAfterPostGenJnlLine', params: 'var GenJournalLine: Record "Gen. Journal Line"; CommitIsSuppressed: Boolean' },
            ]
        },
        {
            category: 'Item',
            events: [
                { publisher: 'Codeunit "Item Jnl.-Post Line"', event: 'OnBeforePostItemJnlLine', params: 'var ItemJournalLine: Record "Item Journal Line"; CalledFromAdjustment: Boolean; CalledFromInvtPutawayPick: Boolean; var ItemRegister: Record "Item Register"; var ItemLedgEntryNo: Integer; var ValueEntryNo: Integer; var ItemApplnEntryNo: Integer' },
                { publisher: 'Table "Item"', event: 'OnAfterValidateEvent (Description)', params: 'var Rec: Record "Item"; var xRec: Record "Item"; CurrFieldNo: Integer' },
            ]
        },
        {
            category: 'Customer / Vendor',
            events: [
                { publisher: 'Table "Customer"', event: 'OnAfterValidateEvent (Name)', params: 'var Rec: Record "Customer"; var xRec: Record "Customer"; CurrFieldNo: Integer' },
                { publisher: 'Table "Vendor"', event: 'OnAfterValidateEvent (Name)', params: 'var Rec: Record "Vendor"; var xRec: Record "Vendor"; CurrFieldNo: Integer' },
            ]
        }
    ],

    render() {
        const categoryOptions = this.commonEvents.map(c =>
            `<option value="${c.category}">${c.category}</option>`
        ).join('');

        return `
            <div class="tool-tabs" id="eventTabs">
                <button class="tool-tab active" data-tab="common" onclick="EventGenerator.switchTab('common')">Eventos Comunes</button>
                <button class="tool-tab" data-tab="custom" onclick="EventGenerator.switchTab('custom')">Personalizado</button>
            </div>

            <div class="tool-tab-content active" id="tab-common">
                <div class="tool-form-group">
                    <label>Categoría</label>
                    <select class="tool-select" id="eventCategory" onchange="EventGenerator.updateEventList()">
                        ${categoryOptions}
                    </select>
                </div>
                <div class="tool-form-group">
                    <label>Evento</label>
                    <select class="tool-select" id="eventSelect"></select>
                </div>
                <div class="tool-row">
                    <div class="tool-form-group">
                        <label>Codeunit ID</label>
                        <input class="tool-input" type="number" id="eventCuId" placeholder="50100">
                    </div>
                    <div class="tool-form-group">
                        <label>Codeunit Name</label>
                        <input class="tool-input" type="text" id="eventCuName" placeholder="My Event Subscribers">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="EventGenerator.generateCommon()" style="margin-top:8px">
                    Generar Subscriber &rarr;
                </button>
            </div>

            <div class="tool-tab-content" id="tab-custom">
                <div class="tool-row">
                    <div class="tool-form-group">
                        <label>Tipo de Evento</label>
                        <select class="tool-select" id="customEventType">
                            <option value="BusinessEvent">Business Event</option>
                            <option value="IntegrationEvent">Integration Event</option>
                        </select>
                    </div>
                    <div class="tool-form-group">
                        <label>Object Type</label>
                        <select class="tool-select" id="customObjType">
                            <option value="Codeunit">Codeunit</option>
                            <option value="Table">Table</option>
                            <option value="Page">Page</option>
                            <option value="Report">Report</option>
                        </select>
                    </div>
                </div>
                <div class="tool-row">
                    <div class="tool-form-group">
                        <label>Publisher Object</label>
                        <input class="tool-input" type="text" id="customPublisher" placeholder='Sales-Post'>
                    </div>
                    <div class="tool-form-group">
                        <label>Event Name</label>
                        <input class="tool-input" type="text" id="customEventName" placeholder="OnBeforePost">
                    </div>
                </div>
                <div class="tool-form-group">
                    <label>Parámetros (separados por ;)</label>
                    <input class="tool-input" type="text" id="customParams" placeholder='var SalesHeader: Record "Sales Header"; var IsHandled: Boolean'>
                </div>
                <div class="tool-row">
                    <div class="tool-form-group">
                        <label>Codeunit ID</label>
                        <input class="tool-input" type="number" id="customCuId" placeholder="50100">
                    </div>
                    <div class="tool-form-group">
                        <label>Codeunit Name</label>
                        <input class="tool-input" type="text" id="customCuName" placeholder="My Event Subscribers">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="EventGenerator.generateCustom()" style="margin-top:8px">
                    Generar Subscriber &rarr;
                </button>
            </div>

            <div class="tool-output" id="eventOutput" style="display:none">
                <div class="tool-output-header">
                    <span class="tool-output-title" id="eventFileName">EventSubscribers.al</span>
                    <button class="tool-copy-btn" onclick="EventGenerator.copy()">Copiar</button>
                </div>
                <pre class="tool-output-code" id="eventCode"></pre>
            </div>
        `;
    },

    init() {
        this.updateEventList();
    },

    switchTab(tabId) {
        document.querySelectorAll('#eventTabs .tool-tab').forEach(t =>
            t.classList.toggle('active', t.dataset.tab === tabId));
        document.querySelectorAll('.tool-tab-content').forEach(c =>
            c.classList.toggle('active', c.id === `tab-${tabId}`));
    },

    updateEventList() {
        const category = document.getElementById('eventCategory').value;
        const events = this.commonEvents.find(c => c.category === category)?.events || [];
        const select = document.getElementById('eventSelect');
        select.innerHTML = events.map((e, i) =>
            `<option value="${i}">${e.event} (${e.publisher})</option>`
        ).join('');
    },

    generateCommon() {
        const category = document.getElementById('eventCategory').value;
        const eventIdx = document.getElementById('eventSelect').value;
        const cuId = document.getElementById('eventCuId').value || '50100';
        const cuName = document.getElementById('eventCuName').value || 'My Event Subscribers';
        const events = this.commonEvents.find(c => c.category === category)?.events || [];
        const event = events[eventIdx];

        if (!event) return;

        const code = `codeunit ${cuId} "${cuName}"
{
    [EventSubscriber(ObjectType::${event.publisher.split('"')[0].trim()}, ${event.publisher.includes('"') ? event.publisher.split(' ').slice(0, 1)[0] + ' ' : ''}${event.publisher.includes('"') ? '"' + event.publisher.split('"')[1] + '"' : event.publisher}, '${event.event}', '', false, false)]
    local procedure ${event.event}(${event.params})
    begin
        // Your code here
    end;
}`;

        this.showOutput(code, cuName);
    },

    generateCustom() {
        const eventType = document.getElementById('customEventType').value;
        const objType = document.getElementById('customObjType').value;
        const publisher = document.getElementById('customPublisher').value || 'Sales-Post';
        const eventName = document.getElementById('customEventName').value || 'OnBeforePost';
        const params = document.getElementById('customParams').value || 'var IsHandled: Boolean';
        const cuId = document.getElementById('customCuId').value || '50100';
        const cuName = document.getElementById('customCuName').value || 'My Event Subscribers';

        const code = `codeunit ${cuId} "${cuName}"
{
    [EventSubscriber(ObjectType::${objType}, ${objType} "${publisher}", '${eventName}', '', false, false)]
    local procedure ${eventName}(${params})
    begin
        // Your code here
    end;
}`;

        this.showOutput(code, cuName);
    },

    showOutput(code, name) {
        document.getElementById('eventCode').textContent = code;
        document.getElementById('eventOutput').style.display = 'block';
        document.getElementById('eventFileName').textContent = `${name}.al`;
    },

    copy() {
        const code = document.getElementById('eventCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.querySelector('#eventOutput .tool-copy-btn');
            btn.textContent = '¡Copiado!';
            setTimeout(() => btn.textContent = 'Copiar', 2000);
        });
    }
};
