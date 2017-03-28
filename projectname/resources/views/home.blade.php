@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel-heading">Dashboard</div>

            <div class="panel-body">
                <div>orig_user_id: <span>{{ Auth::id() }} </span></div>
                <div>user_id: <span id="user_id">{{ Auth::id() }} </span></div>
                <div>user_name: <span id="user_name">{{ Auth::id() ? Auth::user()->name : 'Guest' }} </span></div>

                <input name="dse_ajax_param" type="radio" value="head" onclick="X_AUTH.ajax_param_switch = this.value;" checked />head<br />
                <input name="dse_ajax_param" type="radio" value="post" onclick="X_AUTH.ajax_param_switch = this.value;" />post<br />
                <input name="dse_ajax_param" type="radio" value="get"  onclick="X_AUTH.ajax_param_switch = this.value;" />get<br />

                <button onclick="ajax_test()">ajax test</button>
                <pre id="ajax_test">null</pre>
            </div>
        </div>
    </div>
</div>
@endsection
