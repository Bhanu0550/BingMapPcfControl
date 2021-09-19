/// <reference path="../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="../node_modules/bingmaps/types/MicrosoftMaps/Modules/Clustering.d.ts" />

import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class BingMapsField2 implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	
	//contains all the elements for the control
	private _container: HTMLDivElement;
	private _mapDiv: HTMLDivElement;

	//map parameters
	private _bMap: Microsoft.Maps.Map;
	private _bMapOptions: Microsoft.Maps.IViewOptions;
	private _bMapScriptIsLoaded: boolean;
	private _bMapIsLoaded: boolean;
	private _inputElement:HTMLInputElement;
	private _inputValue:string;
	private resetVal:string;

	private _apikey:string;

	// private infodiv:HTMLDivElement;

	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
	private _notifyOutputChanged: () => void;
	// Event Handler 'refreshData' reference
    private _refreshData: EventListenerOrEventListenerObject;
	// Reference to ComponentFramework Context object
	private _context: ComponentFramework.Context<IInputs>;

		
	constructor()
	{

	}

		
	public onClick = (event: Event): void => {
		this._inputElement.value=this.resetVal;
		this._inputValue = this._inputElement.value;
		this._notifyOutputChanged();
	  }

	  public onSave = (event: Event): void => {
		this._inputValue = this._inputElement.value;
		this._notifyOutputChanged();
	  }

	public initMap(){

		var self = this;
		var temp="";
				
		if (!this._bMapScriptIsLoaded) {			
			setTimeout(() => {self.initMap()}, 1000);
			return;
		}		

		// this._bMapPushpinDefaultColor = isHexColor(this._context.parameters.defaultPushpinColor?.raw || '') ? this._context.parameters.defaultPushpinColor.raw as string : '';
		this._bMapOptions = {			
			zoom: 0,			
			center: new Microsoft.Maps.Location(0,0),
			mapTypeId: Microsoft.Maps.MapTypeId.aerial			
		};
		
		this._bMap = new Microsoft.Maps.Map(this._mapDiv, this._bMapOptions);
		this._bMapIsLoaded = true;

		var greenPin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(0, 0), { color: '#0f0', draggable: true });
		this._bMap.entities.push(greenPin);
			
			
		

		Microsoft.Maps.Events.addHandler(greenPin, 'drag', function (e:Event) {
			let location: any = greenPin.getLocation();
			let varLatitude: any = location.latitude;
			let varLong: any = location.longitude;
			let vartitle:any = "lat:" + varLatitude +","+ "long:" + varLong;
			temp=vartitle;
			
			(<HTMLInputElement>document.getElementById("longlat")).value=vartitle;
		});

		this._inputValue=temp;
			
	}

	public addBingMapsScriptToHeader(context: any): void {
		let headerScript: HTMLScriptElement = document.createElement("script");
        headerScript.type = 'text/javascript';
		headerScript.id = "BingMapsHeaderScript";
		headerScript.async = true;
		headerScript.defer = true;
		headerScript.src = `https://www.bing.com/api/maps/mapcontrol?key=${this._apikey}`;
		headerScript.onload = () => {
			this._bMapScriptIsLoaded = true;
		}		
		this._container.appendChild(headerScript);
	}	


	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		//this will ensure that if the container size changes the updateView function will be called.
		context.mode.trackContainerResize(true);

		this._notifyOutputChanged = notifyOutputChanged;
		this._context = context;
		this._container = container;
		this._bMapIsLoaded = false;

		this._inputElement = document.createElement("input");
        this._inputElement.setAttribute("type", "text");
		this._inputElement.setAttribute("id", "longlat");
		this._inputElement.setAttribute("readonly", "true");
		this._inputElement.setAttribute("style", "width:65%");
		// this._inputElement.setAttribute("style","float:left");

		let _resetElement:HTMLInputElement = document.createElement("input");
        _resetElement.setAttribute("type", "reset");
		_resetElement.setAttribute("id", "_resetElement");
		_resetElement.setAttribute("style", "width:15%");
		_resetElement.onclick=this.onClick;

		let _saveElement:HTMLInputElement = document.createElement("input");
        _saveElement.setAttribute("type", "submit");
		_saveElement.setAttribute("value", "Save");
		_saveElement.setAttribute("id", "_saveElement");
		_saveElement.setAttribute("style", "width:15%");
		_saveElement.onclick=this.onSave;
		
		let _inputDiv:HTMLDivElement = document.createElement("div");
		_inputDiv.setAttribute("id", "inputDiv");
        _inputDiv.setAttribute("style", "position:relative;width:100%;height:3.5rem;;border-style: solid;margin:auto;");

		_inputDiv.appendChild(this._inputElement);
		_inputDiv.appendChild(_saveElement);
		_inputDiv.appendChild(_resetElement);

		this._inputValue = context.parameters.primaryFieldName.raw || "";

		this.resetVal=this._inputValue;
		
		this._inputElement.value = this._inputValue;


		var apiKey=context.parameters.bingMapsAPIKey.raw!;
		this._apikey=apiKey;

		this.addBingMapsScriptToHeader(this._context);

		let mainDiv = document.createElement("div");
		mainDiv.setAttribute("id", "mainDiv");
		
		
		this._mapDiv = document.createElement("div");
        this._mapDiv.setAttribute("id", "mapDiv");
        this._mapDiv.setAttribute("style", "position:relative;width:100%;height:80vh;border-style: solid;margin:auto;");
		this.initMap();

		// input for location
		mainDiv.appendChild(_inputDiv);
		mainDiv.appendChild(this._mapDiv);
        //mainDiv.appendChild(this.infodiv);
		
		this._container.appendChild(mainDiv);
        
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{	
		
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			primaryFieldName:this._inputValue
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}