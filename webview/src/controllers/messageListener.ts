class MessageListener {
  onMessage: null | ((e: MessageEvent) => void) = null;

  receive(targetCommand: string, callback: (json: unknown) => boolean) {
    this.onMessage = (e: MessageEvent) => {
      const msgData = e.data;
      const command = "command" in msgData ? msgData.command : "";
      if (command === targetCommand) {
        const json = "json" in msgData ? msgData.json : [];
        const unsubscribe = callback(json);
        if (unsubscribe) {
          this.unsubscribe();
        }
      }
    };

    window.addEventListener("message", this.onMessage);
  }

  unsubscribe() {
    if(this.onMessage !== null) {
      window.removeEventListener("message", this.onMessage);
    }
  }
}

export default MessageListener;
