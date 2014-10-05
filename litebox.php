<div class="wrapper">
	<h1>LITEBOX</h1>
	<h2>a lightbox lite</h2>

	<h3>Usage:</h3>
	<pre class="brush: js; html-script : true">
	<!-- HTML -->

	<a href="#content" title="A Simple TItle">Open LiteBox</a>
	<!-- href references the DOM element to be placed inside the litebox. -->

	<div id="content">Voila!</div>

	<!-- Javascript -->

	<script type="text/javascript">
		$(function(){
			$('a').litebox(); // Initiate litebox with default options
		});
	</script>
	</pre>

	<h3>Documentations:</h3>
	<div class="card-doc">
		<div class="doc-tabs">
			<div class="doc-tab active" id="options">Options</div>
			<div class="doc-tab" id="events">Events / Callbacks</div>
			<div class="doc-tab" id="methods">Methods</div>
		</div>
		<div class="docs">
			<div class="doc" id="doc_options">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<th width="150">Name</th>
						<th width="120">Type</th>
						<th width="120">Default</th>
						<th>Usage / Description</th>
					</tr>
					<tbody>
						<tr>
							<td>buttons</td>
							<td>Array</td>
							<td>null</td>
							<td>
								Give an array of object to set buttons to the litebox.
								<pre class="brush: js; gutter: false">
buttons: [
	{
		label:"Button Label",
		color: "#999", 			// optional
		textColor: "#fff",		// optional
		float: "right", 		// optional
		callback: function(){
			//code to run when button is pressed
		}
	}
]</pre>
							</td>
						</tr>
						<tr>
							<td>title</td>
							<td>String</td>
							<td>null</td>
							<td>Set the upper title of the litebox.</td>
						</tr>
						<tr>
							<td>closeOnOverlay</td>
							<td>Boolean</td>
							<td>true</td>
							<td>Set whether litebox will close when clicking on the overlay.</td>
						</tr>
						<tr>
							<td>width</td>
							<td>String</td>
							<td>"auto"</td>
							<td>
								Set the width of the litebox in "px" or "auto"
							</td>
						</tr>
						<tr>
							<td>height</td>
							<td>String</td>
							<td>"auto"</td>
							<td>
								Set the height of the litebox in "px" or "auto"
							</td>
						</tr>
						<tr>
							<td>messageDuration</td>
							<td>Integer</td>
							<td>5000</td>
							<td>Set the duration of how long the litebox message last when calling
							<pre class="brush: js; gutter: false">$.litebox.showMessage();</pre>
							</td>
						</tr>
						<tr>
							<td>onClose</td>
							<td>Function / Callback</td>
							<td>null</td>
							<td>Set a function to run after litebox closes.
							</td>
						</tr>
						<tr>
							<td>onOpen</td>
							<td>Function / Callback</td>
							<td>null</td>
							<td>Set a function to run after litebox displays.
							</td>
						</tr>
						<tr>
							<td>beforeOpen</td>
							<td>Function / Callback</td>
							<td>null</td>
							<td>Set a function to run before litebox displays.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="doc" id="doc_events">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<th width="150">Name</th>
						<th width="120">Type</th>
						<th width="120">Default</th>
						<th>Usage / Description</th>
					</tr>
					<tbody>
						<tr>
							<td>beforeOpen</td>
							<td>Function / Callback</td>
							<td>null</td>
							<td>Set a function to run before litebox displays.
							</td>
						</tr>				
						<tr>
							<td>onClose</td>
							<td>Function / Callback</td>
							<td>null</td>
							<td>Set a function to run after litebox closes.
							</td>
						</tr>
						<tr>
							<td>onOpen</td>
							<td>Function / Callback</td>
							<td>null</td>
							<td>Set a function to run after litebox displays.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="doc" id="doc_methods">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<th width="200">Name</th>
						<th width="250">Parameters</th>
						<th>Usage / Description</th>
					</tr>
					<tbody>
						<tr>
							<td>open ( target, options )</td>
							<td>
								<div class="param-line">
									<h4>target:</h4>
									jQuery object to be shown in the litebox.

									<h4>options:</h4>
									Options object
								</div>
							</td>
							<td>
								This is the <strong>alternative</strong> method of opening litebox.<br/>
								Sample Usage:
								<pre class="brush: js; gutter: false">
var target = $('#target');

$.litebox.open(target, {
	title: "Amazing Popup",
	buttons: [
	{
		label:"Button Label",
		callback: function(){
			//code to run when button is pressed
		}
	}],
	...
});
								</pre>
							</td>
						</tr>				
						<tr>
							<td>close ( )</td>
							<td>None</td>
							<td>Closes litebox if it is open.
							</td>
						</tr>
						<tr>
							<td>showMessage ( <span class="method-param">messageText</span>, <span class="method-param">color</span> )</td>
							<td>
								<div class="param-line">
									<h4>messageText:</h4>
									Text to show for litebox's notification message.

									<h4>color:</h4>
									CSS Color for the background of the notification message.
								</div>
							</td>
							<td>
								Opens litebox's notification message.
							</td>
						</tr>
						<tr>
							<td>hideMessage ( )</td>
							<td>None</td>
							<td>
								Closes litebox's notification message.
							</td>
						</tr>
						<tr>
							<td>showBtnLoader ( <span class="method-param">btnLabel</span> )</td>
							<td>
								<div class="param-line">
									<h4>btnLabel:</h4>
									The string of the label that matches any existing button
								</div>
							</td>
							<td>
								Display an AJAX loader within the button matching btnLabel string. 
							</td>
						</tr>
						<tr>
							<td>hideBtnLoader ( <span class="method-param">btnLabel</span> )</td>
							<td>
								<div class="param-line">
									<h4>btnLabel:</h4>
									The string of the label that matches any existing button
								</div>
							</td>
							<td>
								Hide the AJAX loader within the button matching btnLabel string. 
							</td>
						</tr>
						<tr>
							<td>showOverlayLoader ( )</td>
							<td>None</td>
							<td>
								Display an AJAX loading screen over entire content of the litebox.
							</td>
						</tr>
						<tr>
							<td>hideOverlayLoader ( )</td>
							<td>None</td>
							<td>
								Hide the AJAX loading screen on-top of litebox's content.
							</td>
						</tr>
						<tr>
							<td>update ( )</td>
							<td>None</td>
							<td>Recalculate the dimensions of the content and resizes litebox to fit.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<a href="https://github.com/alexcheuk/litebox"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
