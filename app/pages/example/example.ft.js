beforeEach(function() {
	browser.get('/');
});

describe('Messages list',function() {

	it('should be initially empty', function() {
		var messages = element.all(by.repeater('msg in messages track by $index'));
		expect(messages.count()).toBe(0);
	});

	it('should add message on button click', function() {
		var messages = element.all(by.repeater('msg in messages track by $index'));
		element.all(by.css('button')).click();
		expect(messages.count()).toBe(1);
		element.all(by.css('button')).click();
		expect(messages.count()).toBe(2);
	});

});


describe('Button',function() {

	it('should have initial label', function() {
		var button = element.all(by.css('button')).get(1);
		expect(button.getText()).toBe("Request service as foo");
	});

	it('should change text according to name', function() {
		var button = element.all(by.css('button')).get(1);
		element(by.model("name")).clear().sendKeys("a robot");
		expect(button.getText()).toBe("Request service as a robot");
	});

});