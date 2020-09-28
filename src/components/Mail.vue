<template>
  <div
    class="container flex flex-col border-t sm:border dark-mode:border-gray-700 sm:rounded-t-lg bg-white dark-mode:bg-gray-900"
  >
    <div
      class="py-4 px-4 flex align-middle bg-gray-200 dark-mode:bg-black dark-mode:bg-opacity-25 rounded-t-lg border-b dark-mode:border-gray-700"
    >
      <div class="flex mr-3">
        <span
          class="bg-red-500 w-4 h-4 inline-block rounded-full mr-2 my-auto cursor-not-allowed"
        ></span>
        <span
          class="bg-yellow-500 w-4 h-4 inline-block rounded-full mr-2 my-auto cursor-not-allowed"
        ></span>
        <span
          class="bg-green-500 w-4 h-4 inline-block rounded-full mr-2 my-auto cursor-not-allowed"
        ></span>
      </div>
      <div>
        <h1 class="font-bold dark-mode:text-white">
          <font-awesome-icon class="mr-2" :icon="['far', 'paper-plane']" />
          Mailto - Generator
        </h1>
      </div>
    </div>
    <div class="px-4 flex flex-col flex-grow">
      <div class="border-b dark-mode:border-gray-700 py-2 flex">
        <label
          for="recipient"
          class="text-gray-600 dark-mode:text-gray-300 mr-2"
          >To:
        </label>
        <input
          id="recipient"
          class="flex-1 bg-transparent dark-mode:text-white focus:outline-none"
          v-model="recipient"
          @input="resetTrigger()"
        />
        <div class="relative">
          <font-awesome-icon
            class="text-gray-600 ml-2 cursor-pointer"
            :icon="['far', 'question-circle']"
            @click="toggleTip()"
          ></font-awesome-icon>
          <div
            class="bg-white border absolute w-64 p-3 rounded-lg right-0 xl:left-0 transition-all ease-in duration-200 opacity-0"
            ref="tip01"
          >
            <h4 class="text-lg font-bold mb-1">Did you know?</h4>
            <p>You can add multiple recipients separated by kommas.</p>
          </div>
        </div>
      </div>
      <div class="border-b dark-mode:border-gray-700 py-2 flex">
        <label for="subject" class="text-gray-600 dark-mode:text-gray-300 mr-2"
          >Subject:
        </label>
        <input
          id="subject"
          class="flex-1 bg-transparent dark-mode:text-white focus:outline-none"
          v-model="subject"
          @input="resetTrigger()"
        />
      </div>
      <div class="pt-2 pb-2 lg:pb-6 flex-grow flex">
        <textarea
          class="bg-transparent dark-mode:text-white focus:outline-none resize-none w-full flex-1"
          v-model="content"
          placeholder="Content"
          @input="resetTrigger()"
        ></textarea>
      </div>
      <div class="lg:hidden block text-center">
        <p class="flex justify-evenly mb-4">
          <a
            class="text-gray-500 transition duration-100 hover:text-gray-700 hover:underline dark-mode:hover:text-gray-300 mx-2"
            href="https://timozacherl.com/apps/#/legal"
            hreflang="de-DE"
            title="Legal Notice"
            target="_blank"
            >Legal Notice · Impressum</a
          ><a
            class="text-gray-500 transition duration-100 hover:text-gray-700 hover:underline dark-mode:hover:text-gray-300 mx-2"
            href="https://timozacherl.com/apps/#/legal#privacy-policy"
            hreflang="de-DE"
            title="Privacy Policy"
            target="_blank"
            >Privacy Policy · Datenschutz</a
          >
        </p>
      </div>
    </div>
    <div
      class="transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5 opacity-100 scale-100 translate-y-0 ease-out duration-500"
      v-if="mailtoLink"
    >
      <div class="max-w-screen-md mx-auto px-2 sm:px-4">
        <div
          class="p-2 rounded-lg bg-gray-900 shadow-lg sm:p-3 dark-mode:bg-white"
        >
          <div class="flex items-center justify-between flex-wrap">
            <div class="mx-2 lg:mx-3 w-0 flex-1 flex items-center">
              <input
                class="w-full bg-transparent text-white dark-mode:text-black font-bold truncate focus:outline-none"
                :value="mailtoLink"
                @focus="$event.target.select()"
                readonly
              />
            </div>
            <div
              class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
            >
              <div class="rounded-md shadow-sm">
                <button
                  type="button"
                  class="mx-2 lg:mx-0 flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-900 bg-white dark-mode:bg-indigo-600 dark-mode:text-white dark-mode:hover:text-white dark-mode:hover:bg-indigo-500 hover:text-gray-800 focus:outline-none focus:underline"
                  v-clipboard:copy="mailtoLink"
                  v-clipboard:success="copySucceeded"
                >
                  Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mail",
  data() {
    return {
      recipient: "",
      subject: "",
      content: "",
      triggeredBtn: null
    };
  },
  methods: {
    copySucceeded(e) {
      e.trigger.classList.add("bg-green-400", "dark-mode:bg-green-400");
      e.trigger.classList.remove(
        "dark-mode:bg-indigo-600",
        "dark-mode:hover:bg-indigo-500"
      );
      e.trigger.innerText = "Link copied!";

      this.triggeredBtn = e.trigger;
    },
    resetTrigger() {
      if (this.triggeredBtn) {
        this.triggeredBtn.classList.remove(
          "bg-green-400",
          "dark-mode:bg-green-400"
        );
        this.triggeredBtn.classList.add(
          "dark-mode:bg-indigo-600",
          "dark-mode:hover:bg-indigo-500"
        );
        this.triggeredBtn.innerText = "Copy link";
        this.triggeredBtn = null;
      }
    },
    toggleTip() {
      if (!this.$refs.tip01.classList.contains("opacity-0")) {
        this.$refs.tip01.classList.toggle("opacity-0");
        setTimeout(() => {
          this.$refs.tip01.classList.add("hidden");
        }, 220);
      } else {
        this.$refs.tip01.classList.remove("hidden");
        setTimeout(() => {
          this.$refs.tip01.classList.toggle("opacity-0");
        }, 20);
      }
    }
  },
  computed: {
    mailtoLink() {
      if (this.recipient.length > 2) {
        let link = `mailto:${this.recipient.replaceAll(", ", ",")}`;

        if (this.subject || this.content) {
          link += "?";
        }

        if (this.subject) {
          let codedSubject = encodeURIComponent(this.subject);

          link += `subject=${codedSubject}`;

          if (this.content) {
            link += "&";
          }
        }

        if (this.content) {
          let codedBody = encodeURIComponent(this.content);

          link += `body=${codedBody}`;
        }

        return link;
      }
      return null;
    }
  }
};
</script>
