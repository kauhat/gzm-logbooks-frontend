<template>
  <div class="grid-cols-3 gap-4 sm:grid">
    <div class="col-span-2">
      <FormKit
        type="mood-circle"
        name="mood"
        label="Mood"
        validation="required"
        label-class="hidden"
      />
    </div>

    <div class="flex flex-col space-around">
      <FormKit
        type="date"
        name="timestamp"
        label="Date"
        validation="required|after:2000-01-01"
        error-behavior="live"
        input-class="w-full"
      />

      <FormKit
        input-class="w-full"
        type="textarea"
        name="comment"
        label="Comment"
      />
    </div>
  </div>
</template>
