package fr.ujf.m2pgi.database.entities;

import java.util.Collection;
import java.util.Date;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;

/**
 *
 * @author FAURE Adrien ()
 *
 */
@Entity
@Table(name="photo")
public class Photo {

	@Id
	@Column(name="photoID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long photoID;

	@ManyToOne
	@JoinColumn(name = "seller_id", nullable = false)
	private Member author;

	@Column(name="description")
	private String description;

	@Column(name="name", nullable=false)
	private String name;

	@Column(name="web_location", nullable=false)
	private String webLocation; //FIXME choose better name (maybe publicLocation, watermarkLocation ...)

	@Column(name="thumbnail")
	private String thumbnail;

	@Column(name="ext")
	private String ext;

	@Column(name="privateLocation")
	private String privateLocation;

	@Column(name="price")
	private float price;

	@Column(name="sales")
	private int sales;

	@Column(name = "date_created", insertable = false, updatable = false,  columnDefinition="timestamp default current_timestamp")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;

	@Column(name = "available")
	private boolean available = true;

	@Column(name="views", insertable = false, updatable = true, columnDefinition = "int default 0")
	private Integer views;

	@Column(name="likes", insertable = false, updatable = true, columnDefinition = "int default 0")
	private Integer likes;

	@Column(name="wishes", insertable = false, updatable = true, columnDefinition = "int default 0")
	private Integer wishes;

	@Column(name="reports", insertable = false, updatable = true, columnDefinition = "int default 0")
	private Integer reports;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "tags",
			joinColumns =  @JoinColumn(name = "photoid"), inverseJoinColumns = @JoinColumn(name = "tagid")
	)
	private Collection<Tag> tags;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "cart")
	private Collection<Member> buyers;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "likedPhotos")
	private Collection<Member> likers;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "viewedPhotos")
	private Collection<Member> viewers;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "wishedPhotos")
	private Collection<Member> wishers;

	@PrePersist
	public void initInDataBase() {
		sales = 0;

	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public int getSales() {
		return sales;
	}

	public void setSales(int sales) {
		this.sales = sales;
	}

	public String getPrivateLocation() {
		return privateLocation;
	}

	public void setPrivateLocation(String privateLocation) {
		this.privateLocation = privateLocation;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getWebLocation() {
		return webLocation;
	}

	public void setWebLocation(String webLocation) {
		this.webLocation = webLocation;
	}

	public long getPhotoID() {
		return photoID;
	}

	public void setPhotoID(long photoID) {
		this.photoID = photoID;
	}

	public Member getAuthor() {
		return author;
	}

	public void setAuthor(Member author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}

	public Integer getWishes() {
		return wishes;
	}

	public void setWishes(Integer wishes) {
		this.wishes = wishes;
	}

	public Integer getReports() {
		return reports;
	}

	public void setReports(Integer reports) {
		this.reports = reports;
	}

	public Collection<Tag> getTags() {
		return tags;
	}

	public void setTags(Collection<Tag> tags) {
		this.tags = tags;
	}

	public Collection<Member> getBuyers() {
		return buyers;
	}

	public void setBuyers(Collection<Member> buyers) {
		this.buyers = buyers;
	}

	public Collection<Member> getLikers() {
		return likers;
	}

	public void setLikers(Collection<Member> likers) {
		this.likers = likers;
	}

	public Collection<Member> getViewers() {
		return viewers;
	}

	public void setViewers(Collection<Member> viewers) {
		this.viewers = viewers;
	}

	public Collection<Member> getWishers() {
		return wishers;
	}

	public void setWishers(Collection<Member> wishers) {
		this.wishers = wishers;
	}
}
