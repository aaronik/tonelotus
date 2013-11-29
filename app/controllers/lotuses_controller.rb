class LotusesController < ApplicationController
	def index
		Tracking.hit(request)
		Gabba::Gabba.new("UT-1234", "the.tonelot.us").page_view("something", "track/me")

		render :index
	end
end
