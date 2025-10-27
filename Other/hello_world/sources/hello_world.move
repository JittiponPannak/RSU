module hello_world::hello_world;

use std::string;

public struct HelloWorldObject has key, store {
    id: UID,
    text: string::String,
}

#[allow(lint(self_transfer))]
public fun mint(ctx: &mut TxContext) {
    let obj = HelloWorldObject { id: object::new(ctx), text: b"Hello World".to_string() };
    
    transfer::public_transfer(obj, ctx.sender());
}