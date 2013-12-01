class Tracking < ActiveRecord::Base
	def self.hit(request)
		ip = request.remote_ip
		geo_info = request.location
		location = "#{geo_info.city}, #{geo_info.state} #{geo_info.country_code}" if geo_info
		time = "#{Time.new.month} / #{Time.new.day}"

		Tracking.create(ip: ip, location: location, time: time)
	end
end
