import { shallowMount } from "@vue/test-utils";
import Index from "@/pages/Index.vue";

describe("Index.vue", () => {
  it("renders data.msg when passed", () => {
    const msg = "Hello, Jest";
    const wrapper = shallowMount(Index, {
      data() {
        return { msg };
      }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
