import {PlatformRef} from '@angular/core';
import {UiArguments, FnArg, PRIMITIVE, ClientMessageBrokerFactory} from '@angular/platform-browser';
import {bootstrapWorkerUi} from "@angular/platform-browser-dynamic";

const FACTORIAL_CHANNEL = "FACTORIAL";

bootstrapWorkerUi("./loader.js")
  .then((ref: any) => {
    let brokerFactory: ClientMessageBrokerFactory = ref.injector.get(ClientMessageBrokerFactory);
    var broker = brokerFactory.createMessageBroker(FACTORIAL_CHANNEL, false);

    document.getElementById("calculate_factorial").addEventListener("click", (e) => {

      var val = (<HTMLInputElement>document.getElementById("factorial")).value;

      var args = new UiArguments("factorial");
      args.method = "factorial";
      var fnArg = new FnArg(val, PRIMITIVE);
      fnArg.value = val;
      fnArg.type = PRIMITIVE;
      args.args = [fnArg];

      broker.runOnService(args, PRIMITIVE)
        .then((res: string) => {
          document.getElementById("result").innerHTML = `<span>${res}</span>`;
        });
    });
});