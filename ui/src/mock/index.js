import moxios from "moxios";

import auth from "./auth";

import foo from "./foo";
import bar from "./bar";

if (process.env.MOCK === true) {
	moxios.install();
	auth();
	foo();
	bar();
}
